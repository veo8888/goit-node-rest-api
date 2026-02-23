import User from "../db/User.js";

export async function findUserByEmail(email) {
  return User.findOne({ where: { email } });
}

export async function findUserById(id) {
  return User.findByPk(id);
}

export async function createUser(data) {
  return User.create(data);
}

export async function updateUser(id, data) {
  const user = await User.findByPk(id);
  if (!user) return null;
  return user.update(data);
}