// src/utils/dbUtils.js
const { sequelize } = require('../models/deviceModel');

exports.syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log('Database synced successfully');
  } catch (err) {
    console.error('Error syncing database:', err);
  }
};