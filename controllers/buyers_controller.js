import Admin from "../models/admin-schema.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Buyer from "../models/buyers-schema.js";

export const createBuyers = async (req, res) => {
    try {
        const { email, phone, password } = req.body;
        if (!email || !phone || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide all the required fields'
            });
        }
        const isAdmin = await Buyer.findOne({ email });
        if (isAdmin) {
            return res.status(400).json({
                status: 'fail',
                message: 'Buyer already exists'
            });
        }
        const hashedPass = await bcrypt.hash(password, 10);
        const buyer1 = {
            email,
            phone,
            password: hashedPass
        };
        const newBuyer = new Buyer(admin1);
        await newBuyer.save();

        return res.status(201).json({
            status: 'success',
            message: 'Admin created successfully'
        });

    } catch (error) {
        console.log("There was an error while creating the Buyer", error);
        return res.status(500).json({
            status: 'fail',
            message: 'Error creating the Buyer',
            error: error.message
        });
    }
}


export const loginBuyers = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide email and password'
            });
        }
        const findBuyer = await Buyer.findOne({ email });
        if (!findBuyer) {
            return res.status(400).json({
                status: 'fail',
                message: 'Admin not found'
            });
          }
        const comparePass = await bcrypt.compare(password, findBuyer.password);
        if (!comparePass) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid password'
            });
        }
        const tokenPayload = { id: findBuyer._id, email: findBuyer.email };
        const jsonToken = jwt.sign(tokenPayload, process.env.SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).json({
            status: 'success',
            message: 'Buyers logged in successfully',
            token: `Bearer ${jsonToken}`,
            user: {
                id:findBuyer._id,
                email: findBuyer.email,
                // phone: findBuyer.phone
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