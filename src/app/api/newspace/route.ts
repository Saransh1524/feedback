import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import NewSpace from "../../../models/NewSpaceModel";

export async function POST(req: NextRequest) {
    const { spaceName, headerTitle, customField, collectionType, imgUrl, questions } = await req.json();

    if (!spaceName ||  !headerTitle || !customField ) {
        return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    await connectDB();
    console.log("mongodb connected");

    const newSpace = new NewSpace({
        spaceName,
        
        headerTitle,
        customField,
        collectionType,
        imgUrl,
        questions
    });

    const result = await newSpace.save().catch((err) => {
        console.error("Error saving to database:", err);
        throw err;
    });
    console.log("Saved Document:", result);    
    return NextResponse.json({ message: 'New space created!', id: result._id }, { status: 201 });
    // Return a response with the success message
    // const response = NextResponse.json({ message: 'New space created!' }, { status: 201 });

    // Set the Location header for redirection
    // response.headers.set('Location', '/dashboard');

    // return response;
}
