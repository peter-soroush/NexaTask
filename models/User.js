import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  todos: [
    {
      title: String,
      status: String,
      description: String,
      dueDate: Date,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

const User = models.User || model("User", userSchema);

export default User;
