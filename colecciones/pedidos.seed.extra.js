
db = db.getSiblingDB("parcialdb");

// helper para restar días
function daysAgo(n){ return new Date(Date.now() - n*24*60*60*1000); }

db.pedidos.insertMany([
  { numero: 2001, cliente: "Ana",     estado: "pendiente", fecha: daysAgo(3)   },
  { numero: 2002, cliente: "Luis",    estado: "enviado",   fecha: daysAgo(10)  },
  { numero: 2003, cliente: "María",   estado: "entregado", fecha: daysAgo(12)  },
  { numero: 2004, cliente: "Sofía",   estado: "pendiente", fecha: daysAgo(18)  },
  { numero: 2005, cliente: "Raúl",    estado: "cancelado", fecha: daysAgo(27)  },
  { numero: 2006, cliente: "Paola",   estado: "enviado",   fecha: daysAgo(29)  },
  { numero: 2007, cliente: "Elena",   estado: "pendiente", fecha: daysAgo(31)  }, 
  { numero: 2008, cliente: "Marco",   estado: "enviado",   fecha: daysAgo(45)  },
  { numero: 2009, cliente: "Diana",   estado: "pendiente", fecha: daysAgo(0)   }, 
  { numero: 2010, cliente: "Iván",    estado: "enviado",   fecha: daysAgo(60)  }
]);

print("Pedidos extra insertados con fechas variadas.");
