db = db.getSiblingDB("parcialdb");
db.clientes.aggregate([
  { $project: { _id: 0, nombre: 1, promedioCompras: { $avg: "$compras" } } }
]);
