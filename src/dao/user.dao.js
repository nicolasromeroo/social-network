import User from "../models/user.model.js";

class UserDao {
  async create(data) {
    const user = await User.create(data);
    return user;
  }

  async getAll() {
    const users = await User.find();
    return users;
  }

  async getById(id) {
    console.log('UserDao getById - Buscando usuario con id:', id);
    const user = await User.findById(id);
    console.log('UserDao getById - Usuario encontrado:', user);
    return user;
  }

  async getByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async update(id, data) {
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    return user;
  }

  async delete(id) {
    const user = await User.findByIdAndDelete(id);
    return user;
  }

  // user X sigue a...? - se busca desde el usuario 2
  async isFollowing(userId, currentUserId) {
    const user = await userDao.getById(userId);
    const following = user.following.includes(currentUserId._id.toString());

    return following;
  }

  // es seguidor -se busca desde el usuario 1
  async isFollower(userId, currentUserId) {
    const user = await userDao.getById(userId);
    const follower = user.followers.includes(currentUserId._id.toString());

    return follower;
  }

  async isPrivate(userId, currentUserId) {
 }
}

const userDao = new UserDao();

export default userDao;
