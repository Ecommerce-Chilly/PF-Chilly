module.exports = (sequelize) => {
   sequelize.define(
      "favorites",
      {},
      {
         timestamps: true,
         paranoid: true,
      }
   );
};
