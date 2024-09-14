import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();
    res.status(200).json({ message: 'Successfully connected to MongoDB' });
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to connect to MongoDB', error: error.message });
  }
}