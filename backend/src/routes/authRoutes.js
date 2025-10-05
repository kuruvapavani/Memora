import express from 'express';
import { firebaseSignIn } from '../controllers/authController.js';

const router = express.Router();

router.post('/', firebaseSignIn);

export default router;
