import { Model, Schema, model } from 'mongoose'
import IUser from './users.interface'
type UserModel = Model<IUser, object>
const userSchema = new Schema<IUser>(
  {
    id: { type: String, require: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

// 3. Create a Model.
const User = model<IUser, UserModel>('User', userSchema)
export default User
