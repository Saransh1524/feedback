import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/UserModel';

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { name, email, password } = await req.json();

    // Check for missing fields
    if (!email || !password || !name) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Connect to the database if not already connected
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 422 });
    }

    // Hash the password (10 rounds of bcrypt)
    const hashedPassword = await hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const result = await newUser.save();

    // Return success response
    return NextResponse.json({ message: 'User created!', userId: result._id, redirect: '/dashboard' }, { status: 201 });

  } catch (error) {
    console.error('Error in user registration:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
