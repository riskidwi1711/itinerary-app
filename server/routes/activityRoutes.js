import express from 'express';
const router = express.Router();
import activityController from '../controllers/activityController.js';

router.get('/', activityController.getAllActivities);
router.post('/', activityController.createActivity);
router.put('/:id', activityController.updateActivity);
router.delete('/:id', activityController.deleteActivity);

export default router;
