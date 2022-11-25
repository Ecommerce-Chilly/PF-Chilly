const { User } = require("../db");

const postUser = async ({
   email,
   password,
   shoppingSessionId,
   orderItemId,
   orderDetailId,
}) => {
   try {
      if (!email || !password) throw new Error("You need to fill all fields");
      const userCreate = await User.create({
         email,
         password,
      });

      return userCreate;
   } catch (error) {
      throw new Error(error);
   }
};

module.exports = postUser;