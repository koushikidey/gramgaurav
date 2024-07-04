import Admin from "../models/admin-schema.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createAdmin = async (req, res) => {
    try {
        const { email, phone, password } = req.body;
        if (!email || !phone || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide all the required fields'
            });
        }
        const isAdmin = await Admin.findOne({ email });
        if (isAdmin) {
            return res.status(400).json({
                status: 'fail',
                message: 'Admin already exists'
            });
        }
        const hashedPass = await bcrypt.hash(password, 10);
        const admin1 = {
            email,
            phone,
            password: hashedPass
        };
        const newAdmin = new Admin(admin1);
        await newAdmin.save();

        return res.status(201).json({
            status: 'success',
            message: 'Admin created successfully'
        });

    } catch (error) {
        console.log("There was an error while creating the Admin", error);
        return res.status(500).json({
            status: 'fail',
            message: 'Error creating the admin',
            error: error.message
        });
    }
}


export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide email and password'
            });
        }
        const findAdmin = await Admin.findOne({ email });
        if (!findAdmin) {
            return res.status(400).json({
                status: 'fail',
                message: 'Admin not found'
            });
          }
        const comparePass = await bcrypt.compare(password, findAdmin.password);
        if (!comparePass) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid password'
            });
        }
        const tokenPayload = { id: findAdmin._id, email: findAdmin.email };
        const jsonToken = jwt.sign(tokenPayload, process.env.SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).json({
            status: 'success',
            message: 'Admin logged in successfully',
            token: `Bearer ${jsonToken}`,
            user: {
                id: findAdmin._id,
                email: findAdmin.email
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