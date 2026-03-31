const express = require("express");
const router = express.Router();

const { validarGasto } = require("../middlewares/validarGasto");
const gastoController = require("../controllers/gastoController");

router.post(
  "/registrar-gasto",
  validarGasto,
  gastoController.crearGastoController,
);

router.get("/listar-gastos", gastoController.listarGastosController);

router.delete("/eliminar-gasto/:id", gastoController.eliminarGastoController);

module.exports = router;
