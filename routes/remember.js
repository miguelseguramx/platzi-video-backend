// Generalmente cuando queremos implementar la opción de recordar
//  sesión para Express mediante passport, lo que hacemos es extender 
//  la expiración de la Cookie.

// En nuestra ruta de sign-in de nuestro render server hacemos 
// las siguientes modificaciones:

// // Agregamos las variables de timpo en segundos
// const THIRTY_DAYS_IN_SEC = 2592000;
// const TWO_HOURS_IN_SEC = 7200;

// app.post("/auth/sign-in", async function(req, res, next) {
//   // Obtenemos el atributo rememberMe desde el cuerpo del request
//   const { rememberMe } = req.body;

//   passport.authenticate("basic", function(error, data) {
//     try {
//       if (error || !data) {
//         next(boom.unauthorized());
//       }

//       req.login(data, { session: false }, async function(error) {
//         if (error) {
//           next(error);
//         }

//         const { token, ...user } = data;

//         // Si el atributo rememberMe es verdadero la expiración será en 30 dias
//         // de lo contrario la expiración será en 2 horas
//         res.cookie("token", token, {
//           httpOnly: !config.dev,
//           secure: !config.dev,
//           maxAge: rememberMe ? THIRTY_DAYS_IN_SEC : TWO_HOURS_IN_SEC
//         });

//         res.status(200).json(user);
//       });
//     } catch (error) {
//       next(error);
//     }
//   })(req, res, next);
// });