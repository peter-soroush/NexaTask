import { getSession } from "next-auth/react";
import connectDB from "../../../../utils/connectDB";
import { getServerSession } from "next-auth";
import User from "../../../../models/User";
import { authOptions } from "./[...nextauth]";
import sortTodos from "../../../../utils/sortTodos";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB" });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ status: "failed", message: "Unauthorized" });
  }

  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "user not found" });
  }

  if (req.method === "POST") {
    const { title, description, status } = req.body;
    if (!title || !description || !status) {
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid data" });
    }

    user.todos.push({ title, description, status });
    await user.save();
    res
      .status(200)
      .json({ status: "success", message: "Todo created successfully!" });
  } else if (req.method === "GET") {
    const sortedData = sortTodos(user.todos);

    res.status(200).json({ status: "success", data: { todos: sortedData } });
  } else if (req.method === "PATCH") {
    const { id, status } = req.body;
    if (!id || !status) {
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid data" });
    }
    const result = await User.updateOne(
      { "todos._id": id },
      { $set: { "todos.$.status": status } },
    );
    console.log(result);
    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ status: "failed", message: "Todo not found" });
    }
    res.status(200).json({ status: "success", message: "Todo updated!" });
  }
}
