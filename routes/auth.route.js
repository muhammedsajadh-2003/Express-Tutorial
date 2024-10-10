import express from "express";
import { usersignUp,userSignIn,signOut } from "../controllers/auth.controller.js";

const app = express();

app.post('/user/sign-up' , usersignUp);
app.post('/user/sign-in' , userSignIn);
app.post('/user/sign-out' , signOut);



export default app;