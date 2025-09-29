db = db.getSiblingDB("parcialdb");

print("Clientes de México mayores de 25 años:\n");

db.clientes.find(
  { pais: "México", edad: { $gt: 25 } }
).forEach(doc => printjson(doc));
