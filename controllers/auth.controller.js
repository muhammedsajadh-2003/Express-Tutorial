import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";

export const usersignUp = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.json({
                success: false,
                message: "please Enter all datas",
            });
        }

        const excistingUser = await User.findOne({ email });

        if (excistingUser) {
            return res.json({
                success: false,
                message: "user already existed",
            });
        }

        const hashedPassword = await bcryptjs.hashSync(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.json({ success: true, message: "sign up Success", newUser });
    }
    catch (error) {
        console.log('error on sign in', error.message)
    }

};

export const userSignIn = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'all feilds are required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ sucess: false, message: 'USer not found' });
        }

        const isValid = await bcryptjs.compareSync(password, user.password);

        const { password: pass, ...rest } = user._doc;

        if (isValid) {
            const token = jwt.sign({ id: user._id, isAdmin: false }, process.env.JWT_SECRET);
            res.status(200).cookie('access_token', token, { httpOnly: 'true' }).json({ success: true, message: "user signed in successfully", user: rest })
        }
    } catch (error) {
        console.log(error.message)
    }

}

export const signOut = async (req, res) => {
    try {
        res.clearCookie("access_token");
        return res.status(200).json({ message: "sign out success" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const adminSignIn = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'all feilds are required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ sucess: false, message: 'USer not found' });
        }

        const isValid = await bcryptjs.compareSync(password, user.password);

        const { password: pass, ...rest } = user._doc;

        if (isValid) {
            const token = jwt.sign({ id: user._id, isAdmin: true }, process.env.JWT_SECRET);
            res.status(200).cookie('access_token', token, { httpOnly: 'true' }).json({ success: true, message: "user signed in successfully", user: rest })
        }
    } catch (error) {
        console.log(error.message)
    }

}