Tienda de Libros - Semana 4 (Desarrollo Frontend II)

Aplicación web desarrollada en React y Vite que simula una tienda de libros con integración frontend-backend mediante una API REST mock (MSW) y enrutamiento con React Router.

Características de la Tarea

Catálogo por categorías: Permite explorar géneros como Ficción, Ciencia Ficción, Misterio y Drama.

API Mock (MSW): Intercepta solicitudes HTTP locales (/api/books?genre=...) simulando un backend real, tiempos de carga y respuestas de error (404).

React Router: Navegación dinámica mediante parámetros en la URL (/categoria/:genre).

Control de estados: Indicadores de carga (loading) y manejo de errores con opción de reintento.

Instrucciones de Ejecución

Instalar dependencias:

npm install


Ejecutar el servidor de desarrollo:

npm run dev


Compilar la aplicación:

npm run build