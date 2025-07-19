import Activity from '../models/activity.js';

const activityController = {
  getAllActivities: (req, res) => {
    Activity.getAll((err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      const activities = rows.map(row => ({
        ...row,
        statusPembayaran: row.statusPembayaran === 1 ? true : false
      }));
      res.json(activities);
    });
  },

  createActivity: (req, res) => {
    const activity = req.body;
    Activity.create(activity, function (err) {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.json({
        message: 'success',
        data: activity,
        id: this.lastID
      });
    });
  },

  updateActivity: (req, res) => {
    const { id } = req.params;
    const activity = req.body;
    Activity.update(id, activity, function (err) {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.json({
        message: 'success',
        data: activity,
        changes: this.changes
      });
    });
  },

  deleteActivity: (req, res) => {
    const { id } = req.params;
    Activity.delete(id, function (err) {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.json({
        message: 'deleted',
        changes: this.changes
      });
    });
  },
};

module.exports = activityController;
