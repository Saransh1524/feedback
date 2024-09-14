import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the interface for a question
interface INewSpace extends Document {
    spaceName: string;
    headerTitle: string;
    customField: string;
    collectionType: string;
    imgUrl: string;
    questions: string[];  // Changed question field to an array of strings
}

// Create the schema
const NewSpaceSchema: Schema = new mongoose.Schema({
    spaceName: { type: String, required: true },
    headerTitle: { type: String, required: true },
    customField: { type: String, required: true },
    collectionType: { type: String, default: "text and video" },
    imgUrl: { type: String },
    questions: [{ type: String }]  // This defines an array of strings for the questions
});


// Define the model with the interface type
const NewSpace: Model<INewSpace> = mongoose.models.NewSpace || mongoose.model<INewSpace>('NewSpace', NewSpaceSchema);

export default NewSpace;
