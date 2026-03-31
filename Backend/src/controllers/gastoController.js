const GastoService = require("../services/gastoService");

const crearGastoController = (req, res) => {
  try {
    const { nombre, monto } = req.body;
    const GastoCreado = GastoService.registrarGasto(nombre, monto);

    res.status(200).json({
      mensaje: "Gasto registrado con exito.",
      data: GastoCreado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Hubo un error al registrar el gasto",
    });
  }
};

const listarGastosController = (req, res) => {
  try {
    const GastosList = GastoService.listarGastos();

    res.status(200).json({ mensaje: "Gastos Listados", data: GastosList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "HUbo un error al listar los gastos" });
  }
};

const eliminarGastoController = (req, res) => {
  try {
    const id = req.params.id;

    const response = GastoService.eliminarGasto(id);

    if (!response) {
      return res
        .status(400)
        .json({ error: "No se encontro el gasto a eliminar." });
    }

    res.status(200).json({ mensaje: "Gasto eliminado correctamente." });
  } catch (error) {
    console.log("Error al eliminar: ", error);
    res.status(500).json({ error: "Ocurrio un error al eliminar el gasto." });
  }
};

module.exports = {
  crearGastoController,
  listarGastosController,
  eliminarGastoController,
};
