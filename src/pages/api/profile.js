import { getSession } from "next-auth/react";
import connectDB from "../../../utils/connectDB";
import User from "../../../models/User";
import { verifyPassword } from "../../../utils/auth";
import { authOptions } from "./auth/[...nextauth]";
import { SiNamesilo } from "react-icons/si";
import { getServerSession } from "next-auth";

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
    const { name, lastName, password } = req.body;
    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return res
        .status(401)
        .json({ status: "failed", message: "Password is incorrect!" });
    }
    user.name = name;
    user.lastName = lastName;
    await user.save();
    res.status(200).json({
      status: "success",
      message: "Profile updated!",
      data: { name, lastName, email: session.user.email },
    });
  } else if (req.method === "GET") {
    res.status(200).json({
      status: "success",
      data: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      },
    });
  }
}
