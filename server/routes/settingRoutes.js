import express from 'express';
const router = express.Router();
import settingController from '../controllers/settingController.js';

router.get('/:key', settingController.getSetting);
router.post('/:key', settingController.setSetting);

module.exports = router;
