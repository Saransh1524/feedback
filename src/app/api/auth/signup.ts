import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import connectDB from '../../../lib/mongodb';
import  User  from '../../../models/UserModel';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Connect to the database
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await hash(password, 12);

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const result = await newUser.save();

    return res.status(201).json({ message: 'User created!', userId: result._id });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
