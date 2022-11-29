import express from 'express';
import validateTokenMiddleware from '../middlewares/auth.middleware';
import UserController from '../controllers/user.controller';

const router = express.Router();

router.post('/', UserController.auth);

router.use(validateTokenMiddleware);

router.get('/validate', UserController.userRole);

export default router;
