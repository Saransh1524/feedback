import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcryptjs'; // Import compare function
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/UserModel';
import { sign } from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  // Connect to the database
  await connectDB();

  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  // Verify the password
  const isMatch = await compare(password, user.password);

  if (!isMatch) {
    return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
  }

  const token = sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  // Successful login: return a response (e.g., success message or token)
  return NextResponse.json({ message: 'Login successful', redirect: '/dashboard',token }, { status: 200 });
}
