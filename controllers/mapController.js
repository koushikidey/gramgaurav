import Map from "../models/maps-schema.js";
import mongoose from "mongoose";
export const handleMap = async (req, res) => {
   const {id,latitude,longitude} = req.body;
    try {
        // Create a new map instance
        const newMap = new Map({
            id,
            latitude,
            longitude,
        });

        // Save the map to the database
        const savedMap = await newMap.save();

        res.status(201).json({
            status: 'success',
            data: savedMap,
        });
    } catch (error) {
        console.error('Error while saving map:', error);
        res.status(500).json({
            status: 'fail',
            message: 'Error saving map',
            error: error.message,
        });
    }
}

export const getmaps = async (req, res) => {
    const id = req.params.id;

    try {
        // Find map data by id
        const map = await Map.findOne({ id });

        if (!map) {
            return res.status(404).json({
                status: 'fail',
                message: 'Map not found',
            });
        }

        res.status(200).json({
            _id:map.id,
            status: 'success',
            data: map,
        });
    } catch (error) {
        console.error('Error while fetching map:', error);
        res.status(500).json({
            status: 'fail',
            message: 'Error fetching map',
            error: error.message,
        });
    }


}