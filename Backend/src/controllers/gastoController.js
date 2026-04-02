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

    if (GastosList === null) {
      return res.status(200).json({ mensaje: "No hay gastos registrados" });
    }

    res.status(200).json({ mensaje: "Gastos Listados", data: GastosList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error al listar los gastos" });
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

const actualizarGastoController = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const response = GastoService.actualizarGasto(id, data);

  if (response === false) {
    return res
      .status(400)
      .json({ error: "No se encontro el gasto a actualizar." });
  }

  res.status(200).json({ mensaje: "Gasto actualizado correctamente." });
};

const totalGastadoController = (req, res) => {
  try {
    const total = GastoService.totalGastado();

    if (total === 0) {
      return res.status(200).json({
        mensaje: "No hay gastos registrados.",
      });
    }

    return res.status(200).json({
      mensaje: "Total gastado.",
      data: total,
    });
  } catch (error) {
    console.log("totalGastadoController: ", error);
    return res.status(500).json({
      error: "Ocurrio un error al calcular el total gastado.",
    });
  }
};

module.exports = {
  crearGastoController,
  listarGastosController,
  eliminarGastoController,
  actualizarGastoController,
  totalGastadoController,
};
