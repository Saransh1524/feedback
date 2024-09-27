import { NextResponse } from 'next/server';
import ClientReview from '../../../models/ClientReviewModel'; // Import the ClientReview model

// Handler for POST requests to save client review
export async function POST(request: Request) {
  try {
    const { clientEmail, spaceName, videoUrl } = await request.json();

    // Validate the input data
    if (!clientEmail || !spaceName || !videoUrl) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Create a new ClientReview document
    const newReview = new ClientReview({
      clientEmail,
      spaceName,
      videoUrl,
    });

    // Save the review to the database
    await newReview.save();

    return NextResponse.json({ message: 'Client review saved successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error saving client review:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
