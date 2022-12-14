const { Data_user } = require('../../db');

const putDataUser = async ({
  id,
  firstname,
  lastname,
  address,
  country,
  city,
  postalcode,
  mobile,
}) => {
  const update = await Data_user.findByPk(id);
  if (!update) {
    throw Error(`The data user with id: ${id} is not exist`);
  } else {
    update.firstname = firstname;
    update.lastname = lastname;
    update.address = address;
    update.country = country;
    update.city = city;
    update.postalcode = postalcode;
    update.mobile = mobile;
    await update.save();
    return update;
  }
};

module.exports = putDataUser;
