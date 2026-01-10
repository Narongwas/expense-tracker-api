import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import createUser from "../utils/createUser";
import { getUserByEmail } from "../utils/getUser";
import jwt from "jsonwebtoken";

export async function loginController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const checkUser = await getUserByEmail(email);
    if(!checkUser){
      res.status(404).json({
        success: false,
        message: "email not found"
      })
      return;
    }

    const { hashedPassword } = checkUser;
    const ok = bcrypt.compare(password,hashedPassword);
    
    if(!ok){
      res.status(403).json({
        success: false,
        message: "password is not correct"
      })
      return;
    }

    

  } catch (err) {

  }
}

export async function signupController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const checkUser = await getUserByEmail(email);

    if (checkUser) {
      res.status(409).json({
        success: false,
        message: "This user is already existed",
      });
      return;
    }

    const user = await createUser(email, password);
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        iat: new Date().getTime(),
        exp: new Date().getTime() + 3 * 24 * 3600 * 1000,
      },
      process.env.JWT_SECRET || ""
    );

    res.json({
      success: true,
      token: token,
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      res.status(400).json({
        success: false,
        message: (err as mongoose.Error.ValidationError).message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: (err as Error).message,
    });
  }
}
