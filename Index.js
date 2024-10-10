import express from "express";
import userRoutes from './routes/user.route.js'
import adminRoutes from './routes/admin.route.js'
import authRoutes from './routes/auth.route.js'
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 3000;

app.listen(port, ()=> {
    console.log(`server listening on ${port}`);
});

mongoose.connect(
    process.env.MONGO
)
.then(()=> {
    console.log('Data base connected');
})
.catch((e)=> {
    console.log('Data base Connection Error', e.message);
});

app.use(express.json());
app.use(cookieParser());
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
