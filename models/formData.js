import mongoose from 'mongoose';

const formDataSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    numberOfGoats: { type: Number, required: true },
    vaccinationStatus: { type: [String], required: true },
    pregnancyStatus: { type: [String], required: true },
    numberOfKids: { type: [Number], required: true },
    healthIssues: { type: [Boolean], required: true },
    weight: { type: [Number], required: true },
    goatsReadyForSale: { type: [String], required: true },
    goatsDied: { type: [String], required: true },
    comment: { type: String, required: false, default: '' } // Default value added
}, { timestamps: true });

const FormData = mongoose.model('FormData', formDataSchema);
export default FormData;
