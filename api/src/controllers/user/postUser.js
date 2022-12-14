const { User } = require('../../db');
const { addCart } = require('../cart/addCart');
const postUser = async ({ email, name, img, id }) => {
  try {
    if (!email) throw 'You need to fill all fields';
    const findUser = await User.findOne({ where: { email: email } });
    if (findUser) throw `The user with the email ${email} exist`;
    const ostras = await User.create({ id, email, name, img });
    await addCart(ostras.id);
    return `the user was created`;
  } catch (error) {
    throw error;
  }
};

module.exports = postUser;
