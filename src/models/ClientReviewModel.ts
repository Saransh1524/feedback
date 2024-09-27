import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the interface for ClientReview
interface IClientReview extends Document {
  clientEmail: string;
  spaceName: string;
  videoUrl: string;
}

// Create a schema for ClientReview
const clientReviewSchema: Schema = new mongoose.Schema({
  clientEmail: { type: String, required: true },
  spaceName: { type: String, required: true },
  videoUrl: { type: String, required: true },
}, {
  timestamps: true, // Optional: This adds createdAt and updatedAt timestamps
});

// Create the model for ClientReview
const ClientReview: Model<IClientReview> = mongoose.models.ClientReview || mongoose.model<IClientReview>('ClientReview', clientReviewSchema);

// Export the model
export default ClientReview;
