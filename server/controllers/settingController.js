import Setting from '../models/setting.js';
import logger from '../middleware/logger.js';

const settingController = {
  getSetting: (req, res) => {
    const { key } = req.params;
    Setting.get(key, (err, row) => {
      if (err) {
        logger.error("Error getting setting:", err.message);
        res.error(err.message, 400);
        return;
      }
      res.success({ key, value: row ? row.value : null });
    });
  },

  setSetting: (req, res) => {
    const { key } = req.params;
    const { value } = req.body;
    Setting.set(key, value, function (err) {
      if (err) {
        logger.error("Error setting setting:", err.message);
        res.error(err.message, 400);
        return;
      }
      res.success({ key, value }, 'Setting updated successfully');
    });
  },
};

export default settingController;
