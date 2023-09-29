const { isAdmin } = require("../middlewares/auth_jwt_middleware.js");

module.exports = app => {
    const produtoController = require("../controllers/produto.controller");
    const authJwt = require("../middlewares/auth_jwt_middleware.js");

    //Rota para criar um novo registro Produto
    app.post("/produtos",[authJwt.verifyToken, authJwt.isAdmin], produtoController.create);
    //Buscar todos os registros de Produtos
    app.get("/produtos", [authJwt.verifyToken, authJwt.isBalcao], produtoController.findAll);
    //Buscar apenas um registro de Produto
    app.get("/produtos/:produtoId", [authJwt.verifyToken, authJwt.isBalcao], produtoController.findById);
    //Alterar um registro de Produto
    app.put("/produtos/:produtoId", [authJwt.verifyToken, authJwt.isAdmin], produtoController.update);
    //Excluir um regstro de Produto
    app.delete("/produtos/:produtoId", [authJwt.verifyToken, isAdmin], produtoController.delete);
    //Excluir todos os registros de Produto
    app.delete("/produtos/", [authJwt.verifyToken, isAdmin], produtoController.deleteAll);
}

