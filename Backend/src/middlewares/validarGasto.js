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

module.exports = { validarGasto };
