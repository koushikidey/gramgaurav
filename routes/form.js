import express from 'express';
import { handleFormSubmission } from '../controllers/formController.js';
import { getForm } from '../controllers/formController.js';
const router = express.Router();

router.post('/submit', handleFormSubmission);
router.get('/forms', getForm);
export default router;
