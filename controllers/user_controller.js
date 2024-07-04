import User from '../models/users-schema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {
    try {
        const { email, phone, password } = req.body;
        if (!email || !phone || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide all the required fields'
            });
        }
        const isUser = await User.findOne({ email });
        if (isUser) {
            return res.status(400).json({
                status: 'fail',
                message: 'User already exists'
            });
        }
        const hashedPass = await bcrypt.hash(password, 10);
        const user1 = {
            email,
            phone,
            password: hashedPass
        };
        const newUSer = new User(user1);
        await newUSer.save();

        return res.status(201).json({
            status: 'success',
            message: 'User created successfully'
        });

    } catch (error) {
        console.log("There was an error while creating the User", error);
        return res.status(500).json({
            status: 'fail',
            message: 'Error creating the User',
            error: error.message
        });
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide email and password'
            });
        }
        const findUser = await User.findOne({ email });
        if (!findUser) {
            return res.status(400).json({
                status: 'fail',
                message: 'Admin not found'
            });
          }
        const comparePass = await bcrypt.compare(password, findUser.password);
        if (!comparePass) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid password'
            });
        }
        const tokenPayload = { id: findUser._id, email: findUser.email };
        const jsonToken = jwt.sign(tokenPayload, process.env.SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).json({
            status: 'success',
            message: 'User logged in successfully',
            token: `Bearer ${jsonToken}`,
            user: {
                id: findUser._id,
                email: findUser.email
            }
        });
    } catch (error) {
        console.log("There was an error while logging in", error);
        return res.status(500).json({
            status: 'fail',
            message: 'Error logging in',
            error: error.message
        });
    }
};