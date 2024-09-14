import mongoose , { Document, Model, Schema } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true 
 },
  authMethod: { type: String, default: 'email'},
  password: { type: String,default: null,},

  
});


const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);


export default User;