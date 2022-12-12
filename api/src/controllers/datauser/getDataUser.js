const { Data_user } = require("../../db");

const getDataUser = async() => {
    const dataUser = await Data_user.findAll()
    if(dataUser.length <= 0){
        throw Error("Empty user data");
    }else{
        return dataUser;
    }
}

module.exports = getDataUser;