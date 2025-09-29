# Caso Integrador — Análisis de Pedidos con MongoDB

**Alumno:** Ashley Dayane Alfaro Aguilar 
**Curso:** Bases de Datos II  
**Universidad:** Universidad Da Vinci de Guatemala  
**Docente:** Brandon Antony Chitay Coutiño    
**Fecha:** 28/09/2025 

## 1. Contexto del Caso

La empresa **ShopNow**, dedicada al comercio electrónico, almacena y analiza información de pedidos y clientes.  
El objetivo del proyecto es implementar una base de datos NoSQL con **MongoDB**, que permita realizar consultas rápidas sobre los pedidos más recientes y clasificar a los clientes según su comportamiento de compra.  

Para garantizar portabilidad y facilidad de despliegue, todo el entorno fue configurado con **Docker** usando un archivo `docker-compose.yml`, lo que permite iniciar los servicios con un solo comando.

---

## 2. Objetivo General

Diseñar e implementar una base de datos MongoDB dentro de un contenedor Docker, capaz de:  
- Registrar clientes y pedidos.  
- Generar vistas y consultas de análisis (por país, edad, compras y estado del pedido).  
- Crear índices que optimicen las búsquedas más frecuentes.  
- Ejecutar análisis de rendimiento mediante el comando `explain()`.

---

## 3. Estructura del Proyecto

### colecciones
Contiene los scripts que crean e insertan documentos iniciales:
- `clientesVIP.js` — vista de clientes con promedios de compra mayores a 500.  
- `pedidos.seed.js` — carga inicial de pedidos.  
- `pedidos.seed.extra.js` — datos adicionales.  
- `pedidosActivos.js` — vista para pedidos con estado “pendiente” o “enviado”.

### queries
Incluye las consultas por tema:
- `02_mexico_mayores25.js`: clientes mayores de 25 años en México.  
- `04_pedidos_activos_30dias.js`: pedidos activos recientes.  
- `05_create_index_pedidos_estado_fecha.js`: creación del índice `{ estado: 1, fecha: -1 }`.  
- `06_explain_pedidos_activos_30dias.js`: análisis del plan de ejecución.  

### docker
Contiene la configuración para levantar los servicios:  
- `docker-compose.yml`: define los contenedores `mongo-parcial` y `mongo-express`.  
- `.env`: variables de entorno con credenciales seguras.

---

## 4. Colecciones Principales

### 4.1. Clientes
Cada documento representa un cliente con su nombre, edad, país y lista de compras:
```json
{
  "nombre": "Ana",
  "edad": 28,
  "pais": "México",
  "compras": [120, 340, 560]
}
```

### 4.2. Pedidos
Registra pedidos con número, cliente, estado y fecha:
```json
{
  "numero": 1001,
  "cliente": "Ana",
  "estado": "pendiente",
  "fecha": ISODate("2025-09-28T06:39:39Z")
}
```

---

## 5. Vistas Creadas

### 5.1. Vista `clientesVIP`
Muestra los clientes cuyo promedio de compras supera los 500:
```javascript
db.createView(
  "clientesVIP",
  "clientes",
  [
    { $addFields: { promedioCompras: { $avg: "$compras" } } },
    { $match: { promedioCompras: { $gt: 500 } } },
    { $project: { _id: 0, nombre: 1, edad: 1, pais: 1, promedioCompras: 1 } }
  ]
)
```

### 5.2. Vista `pedidosActivos`
Filtra los pedidos con estado “pendiente” o “enviado”:
```javascript
db.createView(
  "pedidosActivos",
  "pedidos",
  [
    { $match: { estado: { $in: ["pendiente", "enviado"] } } },
    { $project: { _id: 0, numero: 1, cliente: 1, estado: 1, fecha: 1 } }
  ]
)
```

---

## 6. Índices Implementados

Se creó el índice compuesto `{ estado: 1, fecha: -1 }` en la colección `pedidos`, con el siguiente script:

```javascript
db.pedidos.createIndex(
  { estado: 1, fecha: -1 },
  { name: "ix_estado_fecha_desc" }
);
```

Este índice permite optimizar las consultas que filtran por estado y ordenan por fecha descendente.  
Se verificó su existencia con:
```javascript
db.pedidos.getIndexes()
```

---

## 7. Consulta de Pedidos Activos en los Últimos 30 Días

El siguiente script recupera los pedidos con estado “pendiente” o “enviado”, realizados en los últimos 30 días:

```javascript
db.pedidos.find({
  estado: { $in: ["pendiente", "enviado"] },
  fecha: { $gte: new Date(Date.now() - 30*24*60*60*1000) }
}).sort({ fecha: -1 })
```

Resultado esperado:
```json
[
  { "numero": 1001, "cliente": "Ana", "estado": "pendiente" },
  { "numero": 1002, "cliente": "Luis", "estado": "enviado" },
  { "numero": 1004, "cliente": "Sofía", "estado": "pendiente" },
  { "numero": 1006, "cliente": "Paola", "estado": "enviado" }
]
```

---

## 8. Análisis del Plan de Ejecución

Se ejecutó el comando `explain("executionStats")` para medir el rendimiento:

```javascript
db.pedidos.find({
  estado: { $in: ["pendiente", "enviado"] },
  fecha: { $gte: new Date(Date.now() - 30*24*60*60*1000) }
}).sort({ fecha: -1 }).explain("executionStats")
```

### Resultados:
- **Índice usado:** `ix_estado_fecha_desc`  
- **Total de documentos examinados:** 4  
- **Total de claves examinadas:** 4  
- **Tiempo de ejecución:** 4 ms  

Esto demuestra que el índice fue utilizado correctamente (`IXSCAN`), mejorando significativamente el rendimiento.

---

## 9. Justificación del Índice

Si la consulta se ejecutara sin índice, MongoDB tendría que revisar todos los documentos de la colección (escaneo completo).  
Esto incrementaría el tiempo de respuesta y el consumo de recursos, especialmente si la colección tiene miles de registros.  

Con el índice `{ estado: 1, fecha: -1 }`, la base de datos puede saltar directamente a los registros que cumplen la condición, manteniendo el orden cronológico descendente.

---

## 10. Conclusión

El proyecto permitió demostrar las ventajas de usar **MongoDB con Docker** para crear entornos portables y reproducibles.  
Las vistas y los índices facilitaron el análisis de datos y mejoraron el rendimiento.  
Finalmente, el uso de `explain()` confirmó la eficiencia de las consultas, mostrando que los índices reducen el número de documentos examinados y el tiempo de ejecución.

---
