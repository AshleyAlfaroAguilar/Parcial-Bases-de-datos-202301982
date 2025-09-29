db = db.getSiblingDB("parcialdb");

db.pedidos.insertMany([
  { numero: 1001, cliente: "Ana",     estado: "pendiente", fecha: ISODate() },
  { numero: 1002, cliente: "Luis",    estado: "enviado",   fecha: ISODate() },
  { numero: 1003, cliente: "María",   estado: "entregado", fecha: ISODate() },
  { numero: 1004, cliente: "Sofía",   estado: "pendiente", fecha: ISODate() },
  { numero: 1005, cliente: "Raúl",    estado: "cancelado", fecha: ISODate() },
  { numero: 1006, cliente: "Paola",   estado: "enviado",   fecha: ISODate() }
]);

print("Colección 'pedidos' cargada correctamente.");