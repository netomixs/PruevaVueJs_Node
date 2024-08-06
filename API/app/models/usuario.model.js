module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario", {
      Correo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
   
 
    });
 
    return Usuario;
  };