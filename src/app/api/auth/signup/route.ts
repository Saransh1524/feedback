import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/UserModel';


export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!email || !password || !name) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  // Connect to the database
  await connectDB();

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 422 });
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

  return NextResponse.json({ message: 'User created!', userId: result._id,redirect: '/dashboard' }, { status: 201 });
}
