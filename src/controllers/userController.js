import {
  createUser as createUserService,
  getAllUsers as getAllUsersService,
  getUserById as getUserByIdService,
  updateUser as updateUserService,
  deleteUser as deleteUserService,
} from "../services/userServices.js";
import bcrypt from "bcrypt";
const responseHandler = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

const createUser = async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      throw new Error("All fields are required");
    }
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUserService({
      name,
      email,
      password: hashedPassword,
    });
    responseHandler(res, 201, "User created successfully", user);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();

    responseHandler(res, 200, "Users fetched successfully", users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdService(id);
    if (!user) {
      throw new Error("User not found");
    }

    responseHandler(res, 200, "User fetched successfully", user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      throw new Error("All fields are required");
    }
    const { id } = req.params;
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await updateUserService(id, {
      name,
      email,
      password: hashedPassword,
    });
    responseHandler(res, 200, "User updated successfully", user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await deleteUserService(id);
    responseHandler(res, 200, "User deleted successfully", user);
  } catch (error) {
    next(error);
  }
};

export { createUser, getAllUsers, getUserById, updateUser, deleteUser };
