import mongoose from 'mongoose';
import config from '../config/config.js';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.database.uri);

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error);

    throw error;
  }
};

export default connectToDatabase;