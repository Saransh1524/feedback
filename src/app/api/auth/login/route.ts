import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/UserModel';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Connect to the database
    await connectDB();

    // Find the user by email
    const user = await User.findOne({ email });
    // console.log("aditya mil gya bhai")
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Verify the password
    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    // Ensure JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      return NextResponse.json({ message: 'JWT secret is not defined' }, { status: 500 });
    }

    // Create the JWT payload ensuring all values are valid and properly formatted
    const payload = {
      userEmail: user.email,            // String
          
    };

    // Create the JWT token
    const token = sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    // console.log(process.env.JWT_SECRET);
    // console.log(payload);
    // console.log(token);
    // Successful login: return a response

    //after successful token creation
    cookies().set({
      name: 'authToken',
      value: token,
      httpOnly: true, // Ensures the cookie is accessible only through HTTP(S), not via JavaScript
      path: '/', // Cookie is available across the entire site
      sameSite: 'lax', // Restricts cookie to the same site for CSRF protection
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 3600, // Set the expiration time (1 hour)
    });

    return NextResponse.json(
      { message: 'Login successful', redirect: '/dashboard', token },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
