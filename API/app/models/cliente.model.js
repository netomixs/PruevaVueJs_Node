module.exports = (sequelize, Sequelize) => {
 
  const Cliente = sequelize.define("cliente", {
    Nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Apellido_P: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Apellido_M: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
 

  return Cliente;
};
