
db = db.getSiblingDB("parcialdb");

// Crea índice compuesto por estado (asc) y fecha (desc)
const res = db.pedidos.createIndex(
  { estado: 1, fecha: -1 },
  { name: "ix_estado_fecha_desc" }
);

print("Índice creado correctamente:", res);

// Verificar los índices existentes
print("\n Índices actuales en la colección 'pedidos':");
printjson(db.pedidos.getIndexes());
