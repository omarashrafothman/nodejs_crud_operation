import User from "../models/userModel.js";

const createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    if (!users) {
      throw new Error("No users found");
    }
    return users;
  } catch (error) {
    throw new Error(error);
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    return userWithoutPassword;
  } catch (error) {
    throw new Error(error);
  }
};

const updateUser = async (id, userData) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.update(userData);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.destroy();
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

export { createUser, getAllUsers, getUserById, updateUser, deleteUser };
