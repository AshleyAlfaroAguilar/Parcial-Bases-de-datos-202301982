db = db.getSiblingDB("parcialdb");

db.createView(
  "clientesVIP",
  "clientes",
  [
    { $addFields: { promedioCompras: { $avg: "$compras" } } },
    { $match: { promedioCompras: { $gt: 500 } } },
    { $project: { _id: 0, nombre: 1, pais: 1, edad: 1, promedioCompras: 1 } }
  ]
);
