import Volunteer from '../models/volunteer-schema';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// import mongoose from 'mongoose';
export const createVolunteer = async (req, res) => {
    try {
        const { email, phone, password } = req.body;
        if (!email || !phone || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide all the required fields'
            });
        }
        const isVolunteer = await Volunteer.findOne({ email });
        if (isVolunteer) {
            return res.status(400).json({
                status: 'fail',
                message: 'Volunteer already exists'
            });
        }
        const hashedPass = await bcrypt.hash(password, 10);
        const volunteer1 = {
            email,
            phone,
            password: hashedPass
        };
        const newVolunteer = new User(volunteer1);
        await newVolunteer.save();

        return res.status(201).json({
            status: 'success',
            message: 'Volunteer created successfully'
        });

    } catch (error) {
        console.log("There was an error while creating the volunteer", error);
        return res.status(500).json({
            status: 'fail',
            message: 'Error creating the volunteer',
            error: error.message
        });
    }
}


export const loginVolunteer = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide email and password'
            });
        }
        const findVolunteer = await Volunteer.findOne({ email });
        if (!findVolunteer) {
            return res.status(400).json({
                status: 'fail',
                message: 'Volunteer not found'
            });
          }
        const comparePass = await bcrypt.compare(password, findVolunteer.password);
        if (!comparePass) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid password'
            });
        }
        const tokenPayload = { id: findVolunteer._id, email: findVolunteer.email };
        const jsonToken = jwt.sign(tokenPayload, process.env.SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).json({
            status: 'success',
            message: 'Volunteer logged in successfully',
            token: `Bearer ${jsonToken}`,
            user: {
                id:findVolunteer._id,
                email: findVolunteer.email,
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