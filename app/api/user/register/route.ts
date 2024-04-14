import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import prisma from "../../../prisma/client";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

interface User {
  Fname: string;
  Lname: string;
  email: string;
  password: string;
}

dotenv.config();

const pepper = process.env.PEPPER!;
const salt = process.env.SALT_ROUNDS!;

export async function POST(req: Request, res: Response) {
  const user: User = await req.json();
  console.log(user);
  const hashedPassword = bcrypt.hashSync(
    user.password + pepper,
    parseInt(salt)
  );
  user.password = hashedPassword;
  const existedUsers = await prisma.users.findFirst({
    where: { email: user.email },
  });
  if (!user.Fname || !user.Lname)
    return new Response("Please enter your FirstName or LastName", {
      status: 401,
    });
  if (!user.password)
    return new Response("Please enter your password", { status: 401 });
  if (existedUsers)
    return new Response("Email is already in use.", { status: 409 });
  else {
    try {
      await prisma.users.create({ data: user });
      console.log("Created!!!");
      return NextResponse.json(user);
    } catch (err) {
      console.log(`there is an error${err}`);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }
}
