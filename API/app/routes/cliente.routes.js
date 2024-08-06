module.exports = (app) => {
  const auth = require('../middleware/auth');
  const cliente = require("../controllers/clientes.controller");
  var router = require("express").Router();

  router.post("/", auth ,cliente.insertar);
  router.put("/",auth , cliente.actualizar);
  router.get("/id/:id", cliente.obtener);
  router.get("/all",auth ,cliente.obtenerTodos);
  router.delete("/:id", auth ,cliente.eliminar);
  app.use("/api/cliente", router);
};
