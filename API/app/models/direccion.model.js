module.exports = (sequelize, Sequelize) => {
  const Direccion = sequelize.define("direccion", {
    Numero: {
      type: Sequelize.INTEGER,
    },
    Calle: {
      type: Sequelize.STRING,
    },
    CP: {
      type: Sequelize.STRING,
    },
    Ciudad: {
      type: Sequelize.STRING,
    },
    Estado: {
      type: Sequelize.STRING,
    },
  });
 
  return Direccion;
};
