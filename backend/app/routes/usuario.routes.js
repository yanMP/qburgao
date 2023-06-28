module.exports = app => {
    const usuarioController = require("../controllers/usuario.controllers.js");

    app.post("/signUp", usuarioController.signUp);
    app.post("/signIn", usuarioController.signIn);
}