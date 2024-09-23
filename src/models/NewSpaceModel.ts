import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the interface for a NewSpace
interface INewSpace extends Document {
    spaceName: string;
    headerTitle: string;
    customField: string;
    collectionType: string;
    imgUrl?: string; // Make this optional if not always provided
    questions: string[]; 
    createdBy: string; // This field will store the email of the creator
}

// Create the schema
const NewSpaceSchema: Schema = new mongoose.Schema({
    spaceName: { type: String, required: true },
    headerTitle: { type: String, required: true },
    customField: { type: String, required: true },
    collectionType: { type: String, default: "text and video" },
    imgUrl: { type: String, default: null }, // Default to null if not provided
    questions: [{ type: String }], // Array of strings for questions
    createdBy: { type: String, required: true } // Required field for the creator's email
});

// Define the model with the interface type
const NewSpace: Model<INewSpace> = mongoose.models.NewSpace || mongoose.model<INewSpace>('NewSpace', NewSpaceSchema);

export default NewSpace;
