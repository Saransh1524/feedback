import mongoose, { ConnectOptions } from 'mongoose';

let isConnected = false; // Track the connection state

const connectDB = async () => {
  try {
    // Check if the connection already exists
    if (isConnected) {
      console.log('Already connected to MongoDB.');
      return;
    }

    // Ensure MONGO_URI is provided
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    // Attempt to connect to MongoDB
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Additional options if needed
    } as ConnectOptions);

    isConnected = true;
    console.log('Connected to MongoDB successfully.');

    return db; // Return the DB connection

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    isConnected = false; // Reset isConnected if connection fails
    throw error; // Re-throw the error after logging it
  }
};

export default connectDB;
