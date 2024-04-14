import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

dotenv.config();

const token = process.env.TOKEN_SECRET!;

export async function middelware(req: Request, res: NextApiResponse) {
  const authorizationHeader = headers().get("authorization");
  console.log(authorizationHeader);
  const verification = authorizationHeader!.split("")[1];
  console.log(verification);
  try {
    let decodedToken = jwt.verify(verification, token);
    console.log(decodedToken);
    return new NextResponse("Successuflly Verified!!", { status: 200 });
  } catch (err) {
    return new NextResponse("Failed To Verify!!", { status: 404 });
  }
}
