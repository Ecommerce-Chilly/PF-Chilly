const { Data_user } = require('../../db');

const postDataUser = async ({
  firstname,
  lastname,
  address,
  country,
  city,
  postalcode,
  mobile,
}) => {
  if (
    !firstname ||
    !lastname ||
    !address ||
    !country ||
    !city ||
    !postalcode ||
    !mobile
  ) {
    throw Error('Sending incomplete information!');
  } else {
    const data = await Data_user.create({
      firstname,
      lastname,
      address,
      country,
      city,
      postalcode,
      mobile,
    });
    return 'Information completed! :D';
  }
};

module.exports = postDataUser;
