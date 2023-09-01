import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();
router.post(
  '/auth/signin',
  // validateRequest(AuthValidation.createZodSchema),
  AuthController.loginUser
);
router.post(
  '/refresh-token',
  // validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

export const AuthRoutes = router;
