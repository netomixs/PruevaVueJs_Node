const { where } = require("sequelize");
const db = require("../models");
const Op = db.Sequelize.Op;
const Joi = require("joi");
const { response } = require("express");
const Cliente = db.Cliente;
const Direccion = db.Direccion;
const Usuario = db.Usuario;
/*
    Insertar nuevo registro de cliente
*/
exports.insertar = (req, res) => {
  try {
    const userSchema = Joi.object({
      nombre: Joi.string().min(3).max(30).required(),
      apellido_P: Joi.string().min(3).max(30).required(),
      apellido_M: Joi.string().min(0).max(30),
      correo: Joi.string().min(5).max(50).email().required(),
      no_Calle: Joi.string().min(2).max(5).required(),
      calle: Joi.string().min(2).max(50).required(),
      cp: Joi.string().min(5).max(5).required(),
      estado: Joi.string().min(5).required(),
      ciudad: Joi.string().min(2).required(),
    });
    const error = userSchema.validate(req.body, { abortEarly: false });
    if (error.error !== undefined) {
      res
        .status(400)
        .json({ error: "Validation failed", details: error.error.details });
    } else {
      Cliente.create(
        {
          Nombre: req.body.nombre,
          Apellido_P: req.body.apellido_P,
          Apellido_M: req.body.apellido_M,
          usuario: {
            Correo: req.body.correo,
          },
          direccion: {
            Numero: req.body.no_Calle,
            Calle: req.body.calle,
            CP: req.body.cp,
            Ciudad: req.body.ciudad,
            Estado: req.body.estado,
          },
        },
        {
          include: [
            { model: Usuario, as: "usuario" },
            { model: Direccion, as: "direccion" },
          ],
        }
      )
        .then((response) => {
          res.status(200).json({ message: "Registro creado" });
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
/**
 * Actualizar registros
 * @param {*} req
 * @param {*} res
 */
exports.actualizar = async (req, res) => {
  try {
    const userSchema = Joi.object({
      idCliente: Joi.number().required(),
      nombre: Joi.string().min(3).max(30).required(),
      apellido_P: Joi.string().min(3).max(30).required(),
      apellido_M: Joi.string().min(0).max(30),
      correo: Joi.string().min(5).max(50).email().required(),
      no_Calle: Joi.string().min(2).max(5).required(),
      calle: Joi.string().min(2).max(50).required(),
      cp: Joi.string().min(5).max(5).required(),
      estado: Joi.string().min(5).required(),
      ciudad: Joi.string().min(2).required(),
    });
    const error = userSchema.validate(req.body, { abortEarly: false });
    if (error.error !== undefined) {
      res
        .status(400)
        .json({ error: "Validation failed", details: error.error.details });
    } else {
      const cliente = await Cliente.findByPk(req.body.idCliente, {
        include: ["usuario", "direccion"],
      });
      if (cliente) {
        cliente.Nombre = req.body.nombre;
        cliente.Apellido_P = req.body.apellido_P;
        cliente.Apellido_M = req.body.apellido_M;
        cliente.usuario.Correo = req.body.correo;
        cliente.direccion.Numero = req.body.no_Calle;
        cliente.direccion.Calle = req.body.calle;
        cliente.direccion.CP = req.body.cp;
        cliente.direccion.Ciudad = req.body.ciudad;
        cliente.direccion.Estado = req.body.estado;

        await cliente.save();
        await cliente.usuario.save();
        await cliente.direccion.save().then((response) => {
          res.status(200).json({ success: true });
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
/**
 * Obtener datos de cliente por Id
 * @param {*} req
 * @param {*} res
 */
exports.obtener = async (req, res) => {
  try {
    const id = req.params.id;
    Cliente.findByPk(id, { include: ["usuario", "direccion"] })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/**
 * Obtener todos los registros
 * @param {*} req
 * @param {*} res
 */
exports.obtenerTodos = async (req, res) => {
  Cliente.findAll({
    include: [
      { model: Usuario, as: "usuario" },
      { model: Direccion, as: "direccion" },
    ],
  })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};
exports.eliminar = async (req, res) => {
  try {
    const id = req.params.id;
    Cliente.destroy({ where: { id: id } })
      .then((response) => {
        res.status(200).json({ message: "Registro eliminado" });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
