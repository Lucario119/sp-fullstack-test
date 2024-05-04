import express from 'express';
import multer from 'multer';
import { uploadFileController } from './controllers/FileController';
import { searchUsersController } from './controllers/UserController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

export const uploadRoute = router.post('/', upload.single('file'), uploadFileController);

export const searchRoute = router.get('/', searchUsersController);
