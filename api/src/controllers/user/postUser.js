const { User } = require('../../db');
const { addCart } = require('../cart/addCart');
const postUser = async ({ email, name, img }, auth0Sub) => {
  try {
    if (!email || !auth0Sub) throw 'You need to fill all fields';
    const findUser = await User.findOne({ where: { email: email } });
    if (findUser) {
      if (findUser.auth0Sub && findUser.auth0Sub !== auth0Sub) {
        throw 'This email is already linked to another identity';
      }

      await findUser.update({ auth0Sub, name, img });
      return 'the user was synchronized';
    }

    const createdUser = await User.create({ email, name, img, auth0Sub });
    await addCart(createdUser.id);
    return `the user was created`;
  } catch (error) {
    throw error;
  }
};

module.exports = postUser;
