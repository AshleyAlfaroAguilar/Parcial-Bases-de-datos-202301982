
db = db.getSiblingDB("parcialdb");

// fecha límite = hace 30 días
const limite = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

print("Pedidos activos en los últimos 30 días:\n");

db.pedidos.find(
  {
    estado: { $in: ["pendiente", "enviado"] },
    fecha: { $gte: limite }
  },
  { _id: 0, numero: 1, cliente: 1, estado: 1, fecha: 1 }
).sort({ fecha: -1 })
.forEach(doc => printjson(doc));
