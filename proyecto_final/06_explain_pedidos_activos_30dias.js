// queries/06_explain_pedidos_activos_30dias.js
db = db.getSiblingDB("parcialdb");

const limite = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

print("Analizando plan de ejecución para pedidos activos últimos 30 días...\n");

const plan = db.pedidos.find(
  { estado: { $in: ["pendiente", "enviado"] }, fecha: { $gte: limite } }
).sort({ fecha: -1 }).explain("executionStats");

// Mostrar resumen del plan
print("Plan ganador:");
printjson(plan.queryPlanner.winningPlan);

// Mostrar estadísticas de ejecución
print("\n Estadísticas:");
printjson({
  totalDocsExamined: plan.executionStats.totalDocsExamined,
  totalKeysExamined: plan.executionStats.totalKeysExamined,
  executionTimeMillis: plan.executionStats.executionTimeMillis
});
