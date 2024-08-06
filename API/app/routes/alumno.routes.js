module.exports = app => {
    const alumno = require("../controllers/alumno.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.get("/", alumno.create);
  
  
    app.use('/api/alumno', router);
  };