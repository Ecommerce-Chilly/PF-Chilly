const { Favorite } = require("../db");

const deleteFavorite = async (id) => {
   try {
      if (!id) throw new Error("Send an id");
      const foundFavorite = await Favorite.findByPk(id);
      console.log("soy foundFavorite " + foundFavorite);
      if (!foundFavorite)
         throw new Error(`The favorite with the id ${id} doesnt exist`);
      await Favorite.destroy({ where: { id: id } }); //deleteAt:null
      return "Favorite deleted";
   } catch (error) {
      throw new Error(error);
   }
};

module.exports = deleteFavorite;
