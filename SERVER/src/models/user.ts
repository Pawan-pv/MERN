<<<<<<< HEAD
import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface UserType extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const userSchema: Schema<UserType> = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

userSchema.pre<UserType>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User: Model<UserType> = mongoose.model<UserType>("User", userSchema);

export default User;
=======
export type UserType ={
    _id: String;
    emai: String;
    password: String;
    firstName: String;
    lastName: String;

};

const userSchema = new mongoose.schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, },
    firstName: {type: String, required: true, },
    lastName: {type: String, required: true, },
    

})

const User = mongoose.model<UserType>("User", userSchema);

export default User
>>>>>>> d2e176d01f87f7de6b3c6ccc7838123bd6dd4700
