const express=require("express")
require("dotenv").config()
const cors=require("cors")
const session=require("express-session")
const passport=require("passport")
const OAuth2Strategy=require("passport-google-oauth2").Strategy
const { findUserByGoogleId, createUser } = require('./model/userSchema');
const MongoStore = require('connect-mongo');

require("./db/connect")

const port=process.env.PORT
const app=express()

app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials: true
}))

app.use(express.json())

//setup session
app.use(session({
    secret:"ABC123",
    resave:false,
    saveUninitialized:true
}))


//setup passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID: process.env.clientId,
        clientSecret: process.env.clientSec,
        callbackURL:"/auth/google/callback", //url must be same as that given in google developer console
        scope: ["profile",'email']
    },
    async(accessToken,refreshToken,profile,done) => {
        //profile contains all the details of google user account
        try{
            let user = await findUserByGoogleId(profile.id);
            if (!user) {
                user = {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    email: profile.emails[0].value,
                    img: profile.photos[0].value,
                    createdAt:new Date(),
                    updatedAt:new Date()
                };
                await createUser(user);
            }
            return done(null, user);
        } catch(err){
            return done(err,null);
        }
    })
)

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
})

//initialize google auth login
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}))

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:3000/dashboard",
    failureRedirect:"http://localhost:3000/login"
}))

app.get('/login/success',async (req,res)=>{
    //we get dta from session as we have created a session usign express-session
    console.log("request from: ",req.user);

    if(req.user){
        res.status(200).json({message:"User login success",user:req.user})
    } else {
        res.status(400).json({message:"Not Authorized"})
    }
})

app.get('/logout',(req,res,next)=>{
    req.logout(function(err){
        if(err) return next(err);
        res.redirect("http://localhost:3000")
    })
})

app.listen(port,()=>{
    console.log("Server started at port: ",port);
})

