# Aplicacion web para guardas notas

Administre sus notas... Esta aplicación utiliza la memoria de su navegador para almacenarlas de manera local. Por lo tanto, su información no es enviada a ningún otro sitio externo.

[Ir a la aplicacion web](https://github.com/brayanduranvelasquez/app-de-notas)

### ¿Como se almacenan?

Utilizando la **API WebStorage** que viene implementada en parte con JavaScript y HTML5. En resumen, *permite que las páginas web almacenen información en la parte del cliente, es decir, el navegador web. Consta de dos mecanismos parecidos a las cookies de sesión de HTTP, pero que permiten almacenar cantidades más grandes de datos, siempre en modo texto*. 

Las notas, no son enviadas a ningún sitio externo, ya que quedan solo y unicamente guardadas en su navegador web, por lo tanto, si desintala, ya sea el navegador web o borra su caché, automaticamente perderá todas las notas almacenadas.

Para más informacion sobre esta API, [leer este articulo](https://desarrolloweb.com/articulos/api-html5-webstorage.html)

### ¿Que datos se almacenan de una nota?

Principalmente, el titulo de la nota. Que es requerido y tiene un limite de 50 caracteres. Y claramente cuenta con el contenido como tal de la nota a almacenar. Y, ademas de esto, se obtienen a traves del mismo dispositivo, los datos como la fecha (dia/mes/año) y hora (hora:minuto:segundo) de ese momento, para mostrarselas al usuario y tambien poder organizar las notas (de la más actualizada, a la más antigua)...

### ¿Cuantas notas se pueden almacenar?

Recordando que un caracter, equivale a **1 byte**.

Cada contenido de una nota, puede almacenar hasta 10000 caracteres, es decir, que una nota ocupando ese limite, equivale (contando tambien el titulo de la nota, fecha y hora de creacion y modificacion de la misma) aproximadamente **10kb**. Y, ya que la **API WebStorage** permite almacenar en memoria hasta 5mb o 10mb, segun sea el navegador web, estamos hablando de un soporte hasta de más de +400 notas para poder almacenar.

### Desarrollo

Esta aplicacion esta desarrollada utilizando el framework [Nuxt.js](https://nuxtjs.org). Por lo tanto, HTML, CSS y JavaScript, van de la mano.

Tambien, se utilizan:

* [Sass](https://sass-lang.com/): Es una extensión para CSS que añade características muy potentes y elegantes a este lenguaje de estilos.
* [Alertifyjs](https://alertifyjs.com/): Un framework de increibles alertas.
* [Font Awesome](http://fontawesome.com): Fabulosa fuente de iconos (edicion gratuita).
* [Lato](https://fonts.google.com/specimen/Lato): Fuente tipografica.

### Soporte PWA

Esta aplicación cuenta con soporte PWA, utilizando el modulo [nuxtjs/pwa](https://pwa.nuxtjs.org/) que facilita el mismo.

¿Que es PWA?, resumiendo, *una aplicación web progresiva (PWA por sus siglas en inglés) es un tipo de software de aplicación que se entrega a través de la web, creado utilizando tecnologías web comunes como HTML, CSS y JavaScript. Incluye trabajar sin conexión, y acceso al hardware del dispositivo, lo que permite crear experiencias de usuario similares a las aplicaciones nativas en dispositivos móviles y de escritorio*.

Para más informacion sobre las PWA, [leer este articulo](https://es.m.wikipedia.org/wiki/Aplicaci%C3%B3n_web_progresiva)

### Diseño Adaptivo (Responsive Design)

La aplicación web está **diseñada para ser adaptiva** según el dispositivo o computadora la cual acceda a ella... Pero, como principales medidas, se tomaron: 

Ancho: 320px.
Alto: 380px.

### Modo nocturno

La aplicación web contiene un boton para cambiar el aspecto de la misma, y es para cambiarlo a algo llamado **modo oscuro**. Permitirá que el color de fondo y colores de las letras, sean más perceptibles cuando estamos en la oscuridad. 

Si el usuario utiliza la configuracion **modo oscuro** de esta aplicación web, quedará guardado en la memoria del navegador, y asi, la proxima vez que el usuario ingrese, podrá obtener su última configuración. 

### Versiones

Actualmente solo cuenta con la version de lanzamiendo.

Versión 1.0.0 (Version de lanzamiento)

- Guardar un titulo y contenido para una nota.
- Eliminar la nota que sea seleccione.
- Ver datos de la nota seleccionada. Como fecha de creacion, modificacion, titulo y contenido
- Editar el titulo y/o la nota que quiera.
- Ordenamiento de notas según el dia de creacion, o modificacion (de la más actualizada, a la más antigua).
- Guardar en el portapapeles, el contenido de la nota seleccionada.
- Modo oscuro

### Vista Previa

![capturada](https://raw.githubusercontent.com/brayanduranvelasquez/app-de-notas/master/screenshots/v1.0.0/capturada.jpg)
![capturada2](https://raw.githubusercontent.com/brayanduranvelasquez/app-de-notas/master/screenshots/v1.0.0/capturada2.jpg)
![capturada3](https://raw.githubusercontent.com/brayanduranvelasquez/app-de-notas/master/screenshots/v1.0.0/capturada3.jpg)
![capturada4](https://raw.githubusercontent.com/brayanduranvelasquez/app-de-notas/master/screenshots/v1.0.0/capturada4.jpg)
![capturada5](https://raw.githubusercontent.com/brayanduranvelasquez/app-de-notas/master/screenshots/v1.0.0/capturada5.jpg)
![capturada6](https://raw.githubusercontent.com/brayanduranvelasquez/app-de-notas/master/screenshots/v1.0.0/capturada6.jpg)
![capturada7](https://raw.githubusercontent.com/brayanduranvelasquez/app-de-notas/master/screenshots/v1.0.0/capturada7.jpg)
![capturada8](https://raw.githubusercontent.com/brayanduranvelasquez/app-de-notas/master/screenshots/v1.0.0/capturada8.jpg)
![capturada9](https://raw.githubusercontent.com/brayanduranvelasquez/app-de-notas/master/screenshots/v1.0.0/capturada9.jpg)
![capturada10](https://raw.githubusercontent.com/brayanduranvelasquez/app-de-notas/master/screenshots/v1.0.0/capturada10.jpg)
![capturada11](https://raw.githubusercontent.com/brayanduranvelasquez/app-de-notas/master/screenshots/v1.0.0/capturada11.jpg)
![capturada12](https://raw.githubusercontent.com/brayanduranvelasquez/app-de-notas/master/screenshots/v1.0.0/capturada12.jpg)

### Compatibilidad

Los navegadores modernos (preferiblemente utilizar Google Chrome superior a la version 70) tienen soporte para está aplicacion. Y ya que esta desarrollada con Nuxt.js, la compatibilidad es mucho mayor.

Para saber más sobre la compatibilidad entre navegadores, utilizando Nuxt.js, puede revisar [la documentacion de Nuxt.js](https://nuxtjs.org).

### Instalacion local

Si por alguna razon, desea bajar este repositorio y correrlo en su computadora, siga las siguientes instrucciones:

```bash
# Instalacion de dependencias
$ npm install

# Servidor en el puerto localhost:3000
$ npm run dev

# Produccion
$ npm run build
$ npm run start

# Generar proyecto estatico
$ npm run generate
```

Para explicacion detallada, puede revisar [la documentacion de Nuxt.js](https://nuxtjs.org).