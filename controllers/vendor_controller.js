import Vendor from '../models/vendors-schema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createVendor = async (req, res) => {
    try {
        const { email, phone, password } = req.body;
        if (!email || !phone || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide all the required fields'
            });
        }

        const isVendor = await Vendor.findOne({ email });
        if (isVendor) {
            return res.status(400).json({
                status: 'fail',
                message: 'Vendor with this email already exists'
            });
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const vendor1 = {
            email,
            phone,
            password: hashedPass
        };

        const newVendor = new Vendor(vendor1);
        await newVendor.save();

        return res.status(201).json({
            status: 'success',
            message: 'Vendor created successfully'
        });

    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error
            const duplicateField = Object.keys(error.keyPattern)[0];
            return res.status(400).json({
                status: 'fail',
                message: `Vendor with this ${duplicateField} already exists`
            });
        }
        console.log("There was an error while creating the Vendor", error);
        return res.status(500).json({
            status: 'fail',
            message: 'Error creating the Vendor',
            error: error.message
        });
    }
};
export const loginVendor = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide email and password'
            });
        }
        
        // Find the vendor by email
        const findVendor = await Vendor.findOne({ email });
        if (!findVendor) {
            return res.status(400).json({
                status: 'fail',
                message: 'Vendor not found'
            });
        }
        
        // Compare the provided password with the stored hash
        const comparePass = await bcrypt.compare(password, findVendor.password);
        if (!comparePass) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid password'
            });
        }
        
        // Create a JWT token
        const tokenPayload = { id: findVendor._id, email: findVendor.email };
        const jsonToken = jwt.sign(tokenPayload, process.env.SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).json({
            status: 'success',
            message: 'Vendor logged in successfully',
            token: `Bearer ${jsonToken}`,
            vendor: {
                id: findVendor._id,
                email: findVendor.email
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
