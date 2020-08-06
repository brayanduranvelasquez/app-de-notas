# STATIC

Este directorio contiene sus archivos estaticos.
Cada archivo dentro de este directorio es mapeado a `/`.

Ejemplo: `/static/robots.txt` es mapeado como `/robots.txt`.

Mas informacion a cerca del uso de este directorio en [la documentacion](https://nuxtjs.org/guide/assets#static).

### ¿Por que la carpeta "app-de-notas"?

Ya que la ruta base de esta aplicacion, es: "/app-de-notas/"... es necesario que la carpeta, dentro de esta carpeta (static) se llame igual a la ruta base (static/app-de-notas), para que al momento de despegar esta aplicacion, todas las peticiones se hagan a partir de esta ruta.