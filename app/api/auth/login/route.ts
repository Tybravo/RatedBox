import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Fallback for dev

export async function POST(req: Request) {
  try {
    const { phone, password } = await req.json();

    if (!phone || !password) {
      return NextResponse.json(
        { message: 'Phone and password are required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Find user and select password (since it's excluded by default)
    const user = await User.findOne({ phone }).select('+password');
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid phone number or password' },
        { status: 401 }
      );
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password!);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid phone number or password' },
        { status: 401 }
      );
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, phone: user.phone },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    return NextResponse.json(
      {
        message: 'Login successful',
        token,
        user: userResponse,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Login error:', error);
    
    // Check for database connection errors
    if (error.name === 'MongoNetworkError' || error.name === 'MongooseServerSelectionError') {
      return NextResponse.json(
        { message: 'Database connection failed. Please check your network connection and database configuration.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}
