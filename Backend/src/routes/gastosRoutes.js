const express = require("express");
const router = express.Router();

const {
  validarGasto,
  validarGastoActualizado,
} = require("../middlewares/validarGasto");
const gastoController = require("../controllers/gastoController");

router.post(
  "/registrar-gasto",
  validarGasto,
  gastoController.crearGastoController,
);

router.get("/listar-gastos", gastoController.listarGastosController);

router.delete("/eliminar-gasto/:id", gastoController.eliminarGastoController);

router.patch(
  "/actualizar-gasto/:id",
  validarGastoActualizado,
  gastoController.actualizarGastoController,
);

router.get("/total-gastado", gastoController.totalGastadoController);

router.get("/gasto-por-categoria", gastoController.gastoPorCategoriaController);

module.exports = router;
