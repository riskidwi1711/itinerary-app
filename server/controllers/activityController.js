import Activity from '../models/activity.js';
import logger from '../middleware/logger.js';

const activityController = {
  getAllActivities: (req, res) => {
    Activity.getAll((err, rows) => {
      if (err) {
        logger.error("Error getting all activities:", err.message);
        res.error(err.message, 400);
        return;
      }
      const activities = rows.map(row => ({
        ...row,
        statusPembayaran: row.statusPembayaran === 1 ? true : false
      }));
      res.success(activities);
    });
  },

  createActivity: (req, res) => {
    const activity = req.body;
    Activity.create(activity, function (err) {
      if (err) {
        logger.error("Error creating activity:", err.message);
        res.error(err.message, 400);
        return;
      }
      res.success(activity, 'Activity created successfully', 201);
    });
  },

  updateActivity: (req, res) => {
    const { id } = req.params;
    const activity = req.body;
    Activity.update(id, activity, function (err) {
      if (err) {
        logger.error("Error updating activity:", err.message);
        res.error(err.message, 400);
        return;
      }
      res.success(activity, 'Activity updated successfully');
    });
  },

  deleteActivity: (req, res) => {
    const { id } = req.params;
    Activity.delete(id, function (err) {
      if (err) {
        logger.error("Error deleting activity:", err.message);
        res.error(err.message, 400);
        return;
      }
      res.success(null, 'Activity deleted successfully');
    });
  },
};

export default activityController;
