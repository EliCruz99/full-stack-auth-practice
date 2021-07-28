import mongoose from "mongoose"
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password_digest: {type: String, required: true, select: false},
  },
  { timestamps: true },
)
export default mongoose.model("User", userSchema)

