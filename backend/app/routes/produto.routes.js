module.exports = app => {
    const produtoController = require("../controllers/produto.controller");
    const authJwt = require("../middlewares/auth_jwt_middleware.js");

    //rota para criar um novo registro Produto
    app.post("/produtos",[authJwt.verifyToken, authJwt.isAdmin], produtoController.create);

    //buscar todos os registros de Produtos
    app.get("/produtos", produtoController.findAll);

    //buscar apenas um registro
    app.get("/produtos/:produtoId", produtoController.findById);

    //alterar um registro de Produto
    app.put("/produtos/:produtoId",[authJwt.verifyToken], produtoController.update);

    //excluir um registro de Produto
    app.delete("/produtos/:produtoId",[authJwt.verifyToken], produtoController.delete);

    //excluir todos os registros de Produtos
    app.delete("/produtos",[authJwt.verifyToken], produtoController.deleteAll);
}