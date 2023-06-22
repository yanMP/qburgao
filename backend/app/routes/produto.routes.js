module.exports = app => {
    const produtoController = require("../controllers/produto.controller");

    //rota para criar um novo registro Produto
    app.post("/produtos", produtoController.create);

    //buscar todos os registros de Produtos
    app.get("/produtos", produtoController.findAll);

    //buscar apenas um registro
    app.get("/produtos/:produtoId", produtoController.findById);

    //alterar um registro de Produto
    app.put("/produtos/:produtoId", produtoController.update);

    //excluir um registro de Produto
    app.delete("/produtos/:produtoId", produtoController.delete);

    //excluir todos os registros de Produtos
    app.delete("/produtos", produtoController.deleteAll);
}