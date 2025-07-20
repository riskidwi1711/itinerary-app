import express from 'express';
import { logout } from '../controllers/authController.js';
import { verifyPin } from '../controllers/pinController.js';

const router = express.Router();

router.post('/verify-pin', verifyPin);
router.post('/logout', logout);

export default router;
