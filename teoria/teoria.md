# Parte Teórica — Primer Parcial  

**Alumno:** Ashley Dayane Alfaro Aguilar 
**Curso:** Bases de Datos II  
**Universidad:** Universidad Da Vinci de Guatemala  
**Docente:** Brandon Antony Chitay Coutiño    
**Fecha:** 28/09/2025 

---

## 1. ¿Qué ventajas ofrece usar MongoDB con Docker?

Docker permite aislar el entorno de ejecución, garantizando que MongoDB funcione siempre de forma consistente en cualquier máquina. Además, facilita la instalación, despliegue y mantenimiento, ya que todo el entorno se define dentro del archivo `docker-compose.yml`.  
Esto reduce problemas de compatibilidad y permite iniciar, detener o eliminar el contenedor sin afectar el sistema principal.

---

## 2. ¿Por qué se recomienda usar `mongosh` y no el cliente gráfico?

`mongosh` permite interactuar directamente con la base de datos usando comandos de shell, lo cual es ideal para tareas de desarrollo, scripting y automatización.  
Además, `mongosh` ofrece más control para crear índices, vistas y ejecutar scripts `.js`, algo que puede ser limitado o más lento desde interfaces gráficas.

---

## 3. ¿Qué diferencia hay entre una colección y una vista?

- **Colección:** Contiene los documentos almacenados de manera persistente en la base de datos.  
- **Vista:** Es una representación virtual basada en una o más colecciones. No almacena datos, solo una definición de consulta, lo que permite mostrar información filtrada o calculada dinámicamente.

En este proyecto, las vistas (`clientesVIP`, `pedidosActivos`) se usaron para mostrar subconjuntos de datos sin duplicar la información.

---

## 4. ¿Por qué crear índices mejora el rendimiento de las consultas?

Los índices permiten acceder a los documentos sin recorrer toda la colección.  
Cuando se filtra o se ordena por campos indexados (por ejemplo, `estado` y `fecha`), MongoDB utiliza estructuras optimizadas tipo B-Tree para localizar los registros rápidamente.  
Esto reduce el número de documentos examinados y mejora el tiempo de respuesta de las consultas.

---

## 5. ¿Qué mide el comando `explain()` y por qué se usa?

El método `explain()` muestra el plan de ejecución que MongoDB utiliza para resolver una consulta.  
Permite identificar si se está usando un índice (`IXSCAN`) o un escaneo completo (`COLLSCAN`).  
Gracias a esto, podemos analizar la eficiencia de las búsquedas y justificar el uso de índices.

---

## 6. ¿Qué sucede si no se usan índices?

Si no existen índices adecuados, MongoDB debe revisar cada documento de la colección para filtrar los resultados.  
Esto se conoce como **escaneo completo** y puede hacer que las consultas sean lentas en colecciones grandes, aumentando el consumo de CPU y memoria.

---

## 7. ¿Por qué es importante crear scripts `.js` para las consultas?

Los scripts `.js` permiten documentar y automatizar las consultas que se ejecutan frecuentemente.  
Además, facilitan la ejecución dentro del contenedor con un solo comando, evitando errores manuales.  
Esto es fundamental para entornos de desarrollo reproducibles, como los creados con Docker.

---

## 8. ¿Qué ventajas ofrece analizar pedidos en los últimos 30 días mediante una vista?

Permite mantener una visión actualizada de los pedidos recientes sin necesidad de ejecutar consultas repetitivas o filtrar manualmente.  
La vista se actualiza dinámicamente conforme se insertan nuevos pedidos, brindando una herramienta útil para el monitoreo y análisis operativo.

---

## 9. ¿Cuál fue el rol del índice compuesto en el análisis de pedidos?  

El índice compuesto `{ estado: 1, fecha: -1 }` permite que MongoDB optimice las consultas que filtran por estado (`pendiente`, `enviado`) y ordenan por fecha descendente.  
Con esto, las búsquedas se vuelven más rápidas y escalables, especialmente al analizar los pedidos más recientes.

---

## 10. Conclusión  

El uso de Docker y MongoDB permitió crear un entorno reproducible, seguro y flexible.  
Se demostró la importancia de los índices para optimizar consultas, así como el valor de las vistas para construir reportes dinámicos sin duplicar información.  
Este enfoque facilita el análisis de datos y la toma de decisiones basada en información actualizada.

---
