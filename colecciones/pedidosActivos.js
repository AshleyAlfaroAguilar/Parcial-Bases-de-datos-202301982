
db = db.getSiblingDB("parcialdb");

db.createView(
  "pedidosActivos",
  "pedidos",
  [
    { $match: { estado: { $in: ["pendiente", "enviado"] } } },
    { $project: { _id: 0, numero: 1, cliente: 1, estado: 1, fecha: 1 } }
  ]
);

print("Vista 'pedidosActivos' creada correctamente.");
