const { Sequelize } = require('sequelize');
const config = require('config');
const dbURI = config.get('dbURI');

const sequelize = new Sequelize(dbURI);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const syncModels = async () => {
  try {
    const res = await sequelize.sync();
    console.log('Synced all models');
  } catch (error) {
    console.log('Failed to sync the models', error);
  }
};

module.exports = { sequelize, connectDB, syncModels };
