module.exports = app => {
    const pedidosController = require("../controllers/pedidos.controller");

    //rota para criar um novo registro Produto
    app.post("/pedidos", pedidosController.create);

    //buscar todos os registros de Produtos
    app.get("/pedidos", pedidosController.findAll);

    //buscar apenas um registro
    app.get("/pedidos/:pedidoId", pedidosController.findById);

    //alterar um registro de Produto
    app.put("/pedidos/:pedidoId", pedidosController.update);

    //excluir um registro de Produto
    app.delete("/pedidos/:pedidoId", pedidosController.delete);

    //excluir todos os registros de Produtos
    app.delete("/pedidos", pedidosController.deleteAll);
}