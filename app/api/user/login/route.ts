import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import prisma from "../../../../prisma/client";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

interface Login {
  email: string;
  password: string;
}

dotenv.config();

const pepper = process.env.PEPPER!;
const token = process.env.TOKEN_SECRET!;

export async function POST(req: Request, res: NextApiResponse) {
  const signIn: Login = await req.json();
  console.log(signIn);
  try {
    const loggedIn = await prisma.users.findUnique({
      where: { email: signIn.email },
    });
    console.log(loggedIn);
    if (!loggedIn) throw new Error("No such user");
    else {
      const hashed = bcrypt.compareSync(
        signIn.password + pepper,
        loggedIn.password!
      );
      console.log(hashed);
      const tokenVerify = jwt.sign(loggedIn.password!, token);
      const data = { loggedIn, tokenVerify };
      return NextResponse.json(data);
    }
  } catch (err) {
    console.log("Un expected Error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
