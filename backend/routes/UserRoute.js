import express from 'express';
import {getUsers, getUsersById, createUser, updateUser, deleteUser, exportExcel} from '../controllers/UserController.js';
// import {exportUsersToXLSX} from '../controllers/UserController.js';


const router = express.Router();

router.get('/users', getUsers);
// router.get('/users', getUsers);
// router.get('/export-users', exportUsersToXLSX);
router.get('/users/:id', getUsersById);
router.get('/export-users', exportExcel);
router.post('/users', createUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;