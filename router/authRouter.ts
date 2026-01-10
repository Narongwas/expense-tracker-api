import express from 'express'
import type { Request, Response } from 'express';
import { loginController, signupController } from '../controller/authController';

const authRouter = express.Router();

authRouter.post("/signup",signupController);

authRouter.post("/login",loginController);

export default authRouter;

