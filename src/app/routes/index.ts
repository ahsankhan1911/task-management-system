
import { Router } from 'express';
import { createTask, deleteTask, getTaskById, getTasks, updateTask, registerUser, loginUser  } from 'app/controllers';
import { authenticateUser, validateTask, validateUser } from 'app/middlewares';

export const router = Router();

// Tasks
router.post('/task', authenticateUser,  validateTask, createTask);

router.get('/task/:id', authenticateUser, getTaskById);

router.put('/task/:id', authenticateUser, validateTask, updateTask);

router.delete('/task/:id', authenticateUser, deleteTask);

router.get('/tasks', authenticateUser, getTasks);

// Users
router.post('/user/register', validateUser, registerUser);

router.post('/user/login', loginUser);

