const dbConfig = require("../../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
const Cliente = require("./cliente.model.js")(sequelize, Sequelize)
const Direccion= require("./direccion.model.js")(sequelize, Sequelize);
const Usuario= require("./usuario.model.js")(sequelize, Sequelize);
Cliente.hasOne(Direccion, { onDelete: 'cascade', hooks: true })
Cliente.hasOne(Usuario, { onDelete: 'cascade', hooks: true })
db.Cliente=Cliente
db.Direccion=Direccion
db.Usuario=Usuario

module.exports = db;
