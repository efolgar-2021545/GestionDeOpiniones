INSTRUCCIONES PARA LEVANTAR EL PROYECTO
1. Descargar el zip de la rama main y abrir el proyecto en Visual Studio Code.
2. Abrir la terminal y colocar el siguiente comando: cd AuthGestionDeOpiniones.
3. Estando ahí realizar el comando: pnpm install nodemon.

// Tienes que tener abierto PgAdmin 4.
4. En pgAdmin, debes crear una base de datos llamada GestionOpinionesAuth con owner postgres.
5. Realizar el siguiente comando para correr el programa: pnpm run dev
6. Para probar las peticiones en PostMan, métete al siguiente link:
https://www.postman.com/efolgar-2021545-2957918/workspace/gestiondeopiniones

// Forma para probar las peticiones:
7. Probar el archivo llamado Registro (reemplaza el name, email y password por los tuyos).
8. En VerificarCuenta, ingresa el token que se mandó a tu correo, únicamente lo que sigue luego de verify/ dentro de la URL.
9. Ahora inicia sesión en el archivo llamado InicioDeSesion (con tu email y password que utilizaste en el Registro).
10. Si deseas cambiar la contraseña, ve al archivo CambiarContraseña. Ahora elige la opción de BEARER TOKEN e ingresa el token que se te dio al iniciar sesión e ingresa tu contraseña actual y la contraseña nueva.

INSTRUCCIONES PARA PROBAR LA GESTION DE OPINIONES
11. Abrir una nueva terminal (sin cerrar la anterior) y utilizar el siguiente comando: cd GestionDeOpiniones
12. Estando ahí realizar el comando: pnpm install nodemon
13. Luego realiza el siguiente comando para correr el programa: pnpm run dev

// Antes de seguir abre MongoDB y verifica que tu conexión haya sido exitosa para así poder ver los cambios que realizaremos.
14. En MongoDB dar click en CONNECT y verificar que haya una base de datos llamada gestionopiniones.
15. Probar las peticiones en PostMan.

// Explicación para probar todas las peticiones de las Publicaciones.
16. Ve al archivo de CrearPublicación. Para realizar una publicación es necesario que vayas a Authorization, elijas la opción de BEARER TOKEN e ingreses el token que se dio al iniciar sesión. Luego modifica los datos del Body/raw para realizar tu primera publicación.
17. EditarPublicacion, para editar una publicación es necesario que en la URL de la petición cambies el id que está luego de /posts/ e ingreses el id de tu publicación. Para editar la publicación es necesario que vayas a Authorization, elijas la opción de BEARER TOKEN e ingreses el token que se te dio al iniciar sesión. También es necesario que cambies los campos del Body/raw a unos nuevos.
18. EliminarPublicacion, para eliminar una publicación es necesario que en la URL de la petición cambies el id que está luego de /posts/ e ingreses el id de tu publicación (recuerda que si editaste tu publicación el id cambió). Para eliminar la publicación es necesario que vayas a Authorization, elijas la opción de BEARER TOKEN e ingreses el token que se te dio al iniciar sesión.

// Explicación para probar todas las peticiones de los Comentarios.
19. Ve al archivo de AgregarComentario, para agregar un comentario es necesario que ingreses en la URL el id de la publicación que comentarás e ingreses un contenido en el Body/raw. Para agregar tu comentario es necesario que vayas a Authorization, elijas la opción de BEARER TOKEN e ingreses el token que se te dio al iniciar sesión.
20. EditarComentario, para editar un comentario es necesario que ingreses en la URL el id de tu comentario y modifiques su contenido en el Body/raw. Para editar tu comentario es necesario que vayas a Authorization, elijas la opción de BEARER TOKEN e ingreses el token que se te dio al iniciar sesión.
21. EliminarComentario, para eliminar un comentario es necesario que ingreses en la URL la petición del id de tu comentario. Para eliminar tu comentario es necesario que vayas a Authorization, elijas la opción de BEARER TOKEN e ingreses el token que se te dio al iniciar sesión.

// Puedes ver si todo funcionó correctamente yendo a MongoDB y verificar que todo esté correcto.