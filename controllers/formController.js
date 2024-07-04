import FormData from '../models/formData.js'; // Adjust path as per your file structure
// import Volunteer from '../models/volunteer-schema.js';
export const handleFormSubmission = async (req, res) => {
    try {
        const {
            'Enter UserID': userId,
            'No.of Goats at present': numberOfGoats,
            'Vaccination status': vaccinationStatus,
            'Pregnancy Status': pregnancyStatus,
            'No.of Kids of Goat 1': numberOfKidsGoat1,
            'No.of Kids of Goat 2': numberOfKidsGoat2,
            'No.of Kids of Goat 3': numberOfKidsGoat3,
            'No.of Kids of Goat 4': numberOfKidsGoat4,
            'No.of Kids of Goat 5': numberOfKidsGoat5,
            'No.of Kids of Goat 6': numberOfKidsGoat6,
            'Is the goat 1 suffering from any disease/health issues?': healthIssueGoat1,
            'Is the goat 2 suffering from any disease/health issues?': healthIssueGoat2,
            'Is the goat 3 suffering from any disease/health issues?': healthIssueGoat3,
            'Is the goat 4 suffering from any disease/health issues?': healthIssueGoat4,
            'Is the goat 5 suffering from any disease/health issues?': healthIssueGoat5,
            'Is the goat 6 suffering from any disease/health issues?': healthIssueGoat6,
            'Is the goat 7 suffering from any disease/health issues?': healthIssueGoat7,
            'Weight of goat 1': weightGoat1,
            'Weight of goat 2': weightGoat2,
            'Weight of goat 3': weightGoat3,
            'Weight of goat 4': weightGoat4,
            'Weight of goat 5': weightGoat5,
            'Weight of goat 6': weightGoat6,
            'Weight of goat 7': weightGoat7,
            'Goats ready for sale': goatsReadyForSale,
            'Have any goats died?': goatsDied,
            'Comments (if any)': comment
        } = req.body;

        // Validate required fields
        if (!userId || !numberOfGoats || vaccinationStatus.length === 0 ||
            pregnancyStatus.length === 0 || !numberOfKidsGoat1 || !numberOfKidsGoat2 ||
            !numberOfKidsGoat3 || !numberOfKidsGoat4 || !numberOfKidsGoat5 || !numberOfKidsGoat6 ||
            !healthIssueGoat1 || !healthIssueGoat2 || !healthIssueGoat3 ||
            !healthIssueGoat4 || !healthIssueGoat5 || !healthIssueGoat6 || !healthIssueGoat7 ||
            !weightGoat1 || !weightGoat2 || !weightGoat3 || !weightGoat4 ||
            !weightGoat5 || !weightGoat6 || !weightGoat7 || goatsReadyForSale.length === 0 ||
            goatsDied.length === 0) {
            return res.status(400).json({
                status: 'fail',
                message: 'All fields except comment are required'
            });
        }

        // Create a new FormData document
        const newFormData = new FormData({
            userId,
            numberOfGoats: parseInt(numberOfGoats),
            vaccinationStatus,
            pregnancyStatus,
            numberOfKids: [
                parseInt(numberOfKidsGoat1),
                parseInt(numberOfKidsGoat2),
                parseInt(numberOfKidsGoat3),
                parseInt(numberOfKidsGoat4),
                parseInt(numberOfKidsGoat5),
                parseInt(numberOfKidsGoat6)
            ],
            healthIssues: [
                healthIssueGoat1 === 'Yes',
                healthIssueGoat2 === 'Yes',
                healthIssueGoat3 === 'Yes',
                healthIssueGoat4 === 'Yes',
                healthIssueGoat5 === 'Yes',
                healthIssueGoat6 === 'Yes',
                healthIssueGoat7 === 'Yes'
            ],
            weight: [
                parseInt(weightGoat1),
                parseInt(weightGoat2),
                parseInt(weightGoat3),
                parseInt(weightGoat4),
                parseInt(weightGoat5),
                parseInt(weightGoat6),
                parseInt(weightGoat7)
            ],
            goatsReadyForSale,
            goatsDied,
            comment
        });

        // Save the document to MongoDB
        await newFormData.save();

        // Respond with success message
        return res.status(201).json({
            status: 'success',
            message: 'Form data submitted successfully',
            data:newFormData
        });
    } catch (error) {
        console.error('Error handling form submission:', error);
        return res.status(500).json({
            status: 'fail',
            message: 'Error submitting form data',
            error: error.message
        });
    }
};
// const Form = require('../models/Form'); // Import your Mongoose model for Form
// const Volunteer = require('../models/Volunteer'); // Import your Mongoose model for Volunteer

export const getForm = async (req, res) => {
    try {   
        const maps = await FormData.find(); // Fetch all maps from the database
        res.status(200).json({
            data: maps
        });
    } catch (error) {
        console.error('Error while fetching maps:', error);
        res.status(500).json({
            status: 'fail',
            message: 'Error fetching maps',
            error: error.message
        });
    }
};
