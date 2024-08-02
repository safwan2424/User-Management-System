import express from 'express';
import { create, find, findOne, update, deleteUser } from '../controller/controller.js';

const router = express.Router();

// API routes
router.post('/users', create); 
router.get('/users', find);
router.get('/users/:id', findOne);
router.put('/users/:id', update);
router.delete('/users/:id', deleteUser);

export default router;
