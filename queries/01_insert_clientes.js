// Seleccionamos la base de datos parcialdb
db = db.getSiblingDB("parcialdb");

// Crear la colección clientes
db.createCollection("clientes");

// Insertar múltiples documentos
db.clientes.insertMany([
  { nombre: "Ana",     edad: 28, pais: "México",    compras: [120, 340, 560] },
  { nombre: "Luis",    edad: 32, pais: "Guatemala", compras: [90, 210] },
  { nombre: "María",   edad: 26, pais: "México",    compras: [600, 720] },
  { nombre: "Carlos",  edad: 24, pais: "Colombia",  compras: [150, 200, 80] },
  { nombre: "Sofía",   edad: 31, pais: "México",    compras: [510, 490, 520] },
  { nombre: "Pedro",   edad: 22, pais: "Perú",      compras: [100] },
  { nombre: "Lucía",   edad: 29, pais: "México",    compras: [300, 450, 700] },
  { nombre: "Andrés",  edad: 35, pais: "Chile",     compras: [220, 130] },
  { nombre: "Valeria", edad: 27, pais: "México",    compras: [800, 120] },
  { nombre: "Jorge",   edad: 30, pais: "Argentina", compras: [400, 400, 410] },
  { nombre: "Elena",   edad: 33, pais: "México",    compras: [520, 530, 540] },
  { nombre: "Diego",   edad: 25, pais: "México",    compras: [200, 210] },
  { nombre: "Camila",  edad: 21, pais: "Ecuador",   compras: [75, 95] },
  { nombre: "Raúl",    edad: 40, pais: "México",    compras: [1000, 100, 200] },
  { nombre: "Natalia", edad: 23, pais: "Guatemala", compras: [140, 60, 90] },
  { nombre: "Héctor",  edad: 28, pais: "México",    compras: [300, 305, 310] },
  { nombre: "Paola",   edad: 34, pais: "México",    compras: [900, 600] },
  { nombre: "Iván",    edad: 27, pais: "España",    compras: [220, 260, 300] },
  { nombre: "Diana",   edad: 29, pais: "México",    compras: [480, 520] },
  { nombre: "Marco",   edad: 26, pais: "México",    compras: [510, 510, 510] }
]);
