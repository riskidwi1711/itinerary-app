import Setting from '../models/setting.js';

const settingController = {
  getSetting: (req, res) => {
    const { key } = req.params;
    Setting.get(key, (err, row) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.json({ key, value: row ? row.value : null });
    });
  },

  setSetting: (req, res) => {
    const { key } = req.params;
    const { value } = req.body;
    Setting.set(key, value, function (err) {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.json({
        message: 'success',
        key,
        value,
        changes: this.changes
      });
    });
  },
};

export default settingController;
