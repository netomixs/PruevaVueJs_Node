module.exports = (sequelize, Sequelize) => {
    const Alumno = sequelize.define("alumno", {
      Nombre: {
        type: Sequelize.STRING
      },
      Calificacion: {
        type: Sequelize.STRING
      },
 
    });
  
    return Alumno;
  };