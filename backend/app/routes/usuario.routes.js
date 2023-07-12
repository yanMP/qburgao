module.exports = app => {
    const usuarioController = require("../controllers/usuario.controllers.js");

    app.post("/signUp", usuarioController.signUp);
    app.post("/signIn", usuarioController.signIn); 
    app.get("/usuarios", usuarioController.findAll);
    app.get("/usuarios/:idUsuario", usuarioController.findById);
    app.put("/usuarios/:idUsuario", usuarioController.update);
    app.delete("/usuarios/:idUsuario", usuarioController.delete);

}