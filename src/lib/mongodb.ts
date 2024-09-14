import mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
      
    }

    console.log('Attempting to connect to MongoDB...');
    console.log(process.env.MONGO_URI)
    const db = await mongoose.connect(process.env.MONGO_URI as string, {
      useUnifiedTopology: true,
    } as ConnectOptions); // Add the 'as ConnectOptions' type assertion
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; // Re-throw the error after logging it
  }
};

export default connectDB;