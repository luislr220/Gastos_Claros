const { v4: uuidv4 } = require("uuid");
const fs = require("node:fs");
const path = require("node:path");
const Gasto = require("../models/Gasto");
const Categorias = path.join(__dirname, "../utils/categorias.json");
const CategoriasArchivo = fs.readFileSync(Categorias, "utf-8");
const CategoriasArchivoJs = JSON.parse(CategoriasArchivo);

let Gastos = [];

const registrarGasto = (nombre, monto) => {
  const id = uuidv4();
  const fecha = new Date().toISOString();

  const nombreCategoria = nombreYCategoria(nombre);
  const categoria = nombreCategoria.categoria;
  console.log("Nombre y categoria: ", nombre, "Categoria: ", categoria);
  const nuevoGasto = new Gasto(id, nombre, monto, categoria, fecha);

  Gastos.push(nuevoGasto);

  return nuevoGasto;
};

const nombreYCategoria = (nombre) => {
  const nombreSplit = nombre.split(" ");
  let nombreL = nombre;
  let categoria = "varios";

  for (let n of nombreSplit) {
    let nLimpia = n
      .normalize("NFD")
      .replaceAll(/[\u0300-\u036f]/g, "")
      .replaceAll(/[^A-Za-z]/g, "")
      .toLowerCase();

    if (CategoriasArchivoJs[nLimpia]) {
      categoria = CategoriasArchivoJs[nLimpia];
      nombreL = nLimpia;
      break;
    }
  }

  console.log("Objeto de nombre limpio: ", {
    nombre: nombreL,
    categoria: categoria,
  });
  return { nombre: nombreL, categoria: categoria };
};

const listarGastos = () => {
  if (Gastos.length === 0) {
    return null;
  }
  return Gastos;
};

const actualizarGasto = (id, data) => {
  const gastoIndex = Gastos.findIndex((gasto) => gasto.id === id);

  //datos = {nombre, monto} req.body;

  if (gastoIndex === -1) {
    return false;
  }

  const gastoActualizado = {
    ...Gastos[gastoIndex],
    ...data,
    fecha: new Date().toISOString(),
  };

  Gastos[gastoIndex] = gastoActualizado;

  return gastoActualizado;
};

const eliminarGasto = (id) => {
  const tamInicial = Gastos.length;

  const lista = Gastos.filter((gasto) => gasto.id !== id);

  if (tamInicial === lista.length) {
    return false;
  }

  Gastos.length = 0;
  Gastos.push(...lista);

  return true;
};

const totalGastado = () => {
  const montos = Gastos.map((gasto) => gasto.monto);
  let total = 0;

  if (montos.length === 0) {
    return total;
  }

  for (let m of montos) {
    total += m;
  }
  console.log(montos);
  return total;
};

module.exports = {
  registrarGasto,
  listarGastos,
  eliminarGasto,
  actualizarGasto,
  totalGastado,
};
