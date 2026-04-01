const validarGasto = (req, res, next) => {
  console.log("Petición que entra: ", req.body);
  const { nombre, monto } = req.body;

  if (!nombre || nombre.trim().length === 0) {
    return res.status(400).json({ error: "El nombre no debe estar vacio" });
  }

  if (!monto || typeof monto !== "number") {
    return res.status(400).json({ error: "El monto no debe estar vació" });
  }

  if (monto <= 0) {
    return res
      .status(400)
      .json({ error: "El monto no debe ser 0 o menor a 0" });
  }

  next();
};

const validarGastoActualizado = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "No puedes mandar un objeto vacio." });
  }

  if ("nombre" in req.body) {
    const { nombre } = req.body;

    if (nombre === undefined || nombre === null) {
      return res.status(400).json({
        error: "No mandes el nombre sin un valor si lo vas actualizar.",
      });
    }

    if (typeof nombre !== "string") {
      return res
        .status(400)
        .json({ error: "Por favor inserta solamente letras para el nombre." });
    }

    if (nombre.trim().length === 0) {
      return res
        .status(400)
        .json({ error: "No mandes valores vacios en el nombre." });
    }
  }

  if ("monto" in req.body) {
    const { monto } = req.body;

    if (monto === undefined || monto === null) {
      return res.status(400).json({
        error: "No mandes el monto sin un valor si lo vas actualizar.",
      });
    }

    if (typeof monto !== "number") {
      return res.status(400).json({
        error: "Por inserta solamente numeros para el monto.",
      });
    }
  }

  next();
};

module.exports = { validarGasto, validarGastoActualizado };
