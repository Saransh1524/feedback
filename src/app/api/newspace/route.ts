import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import NewSpace from "../../../models/NewSpaceModel";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
    const { spaceName, headerTitle, customField, collectionType, imgUrl, questions } = await req.json();

    if (!spaceName || !headerTitle || !customField) {
        return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Connect to the database
    await connectDB();
    console.log("MongoDB connected");

    // Get the token from cookies
    const authToken = cookies().get('authToken')?.value;

    if (!authToken) {
        return NextResponse.json({ message: 'Authorization token is missing' }, { status: 401 });
    }

    let userEmail;
    try {
        const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET!);
        userEmail = (decodedToken as any).userEmail; // Assuming the email is stored in the token

        // for checking ki type string hi hai na email ka
        // console.log("User email from token:", userEmail, "Type:", typeof userEmail);

    } catch (error) {
        console.error('Invalid token:', error);
        return NextResponse.json({ message: 'Invalid token. Please log in again.' }, { status: 401 });
    }

    // Create a new NewSpace document
    const newSpace = new NewSpace({
        spaceName,
        headerTitle,
        customField,
        collectionType,
        imgUrl,
        questions,
        createdBy:  userEmail,
    });
    // all saving correctly
    // console.log("NewSpace Document before saving:", newSpace);
    // Save the document
    const result = await newSpace.save().catch((err) => {
        console.error("Error saving to database:", err);
        throw err;
    });
    //working perfectly after restarting the server and all
    // console.log("Saved Document:", result);
    return NextResponse.json({ message: 'New space created!', id: result._id }, { status: 201 });
}
