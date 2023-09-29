module.exports = app => {
    const produtos_pedidosController = require("../controllers/produto_pedido.controller");
    app.post("/produtos_pedidos", produtos_pedidosController.create);
    app.get("/produtos_pedidos", produtos_pedidosController.findAll);
    app.get("/produtos_pedidos/:produtos_pedidosId", produtos_pedidosController.findById);
    app.put("/produtos_pedidos/:produtos_pedidosId", produtos_pedidosController.update);
    app.delete("/produtos_pedidos/:produtos_pedidosId", produtos_pedidosController.delete);
    app.delete("/produtos_pedidos/", produtos_pedidosController.deleteAll);
}

