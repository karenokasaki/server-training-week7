import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 20,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["professora", "aluno", "ta"],
      default: "aluno",
    },
    age: { type: Number, min: 0, max: 99 },
    active: { type: Boolean, default: true },
    endereco: {
      cidade: { type: String },
      estado: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", userSchema);

export default UserModel;
