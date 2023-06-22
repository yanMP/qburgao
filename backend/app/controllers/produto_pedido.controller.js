const ProdutoPedidoModel = require("../models/produto_pedido.model");


exports.create = (req, res) => {
    if (!req.body.observacao || !req.body.produtos_idprodutos || !req.body.pedidos_idpedidos) {
        res.status(400).send({
            message: "conteúdo do corpo da requisição vazia;"
        });
    } else {
        const produtoPedido = new ProdutoPedidoModel({
            observacao: req.body.observacao,
            produtos_idprodutos: req.body.produtos_idprodutos,
            pedidos_idpedidos: req.body.pedidos_idpedidos
        });
        
        ProdutoPedidoModel.create(produtoPedido, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Ocorreu um erro ao inserir os dados"
                });
            } else {
                res.send(data);
            }
        })

    }



}
exports.findAll = (req, res) => {
    ProdutoPedidoModel.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "ocorreu erro desconhecido!"
            });
        } else {
            res.send(data);
        }
    });
}
exports.findById = (req, res) => {
    ProdutoPedidoModel.findById(req.params.produtoPedidoId, (err, data) => {
        if (err) {
            if (err.type == "not_found") {
                res.status(404).send({
                    message: "pedido do produto não encontrado. ID: " + req.params.produtoPedidoId
                });
            } else {
                res.status(500).send({
                    message: "erro ao retornar o produto com ID: " + req.params.produtoPedidoId
                });
            }
        } else {
            res.send(data);
        }
    })
}

exports.findByProduto = (req, res) => {

    ProdutoPedidoModel.findByProduto(req.params.produtoPedidoId, (err, data) => {

        if (err) {

            if (err.type == "not_found") {

                res.status(404).send({

                    message: "Pedido do produto não encontrado. ID: " + req.params.produtoPedidoId

                });

            } else {

                res.status(500).send({

                    message: "Erro ao retornar o pedido do produto com ID: " + req.params.produtoPedidoId

                });

            }

        } else {

            res.send(data);

        }

    })

}




exports.findByPedido = (req, res) => {

    ProdutoPedidoModel.findByPedido(req.params.produtoPedidoId, (err, data) => {

        if (err) {

            if (err.type == "not_found") {

                res.status(404).send({

                    message: "Pedido do produto não encontrado. ID: " + req.params.produtoPedidoId

                });

            } else {

                res.status(500).send({

                    message: "Erro ao retornar o pedido do produto com ID: " + req.params.produtoPedidoId

                });

            }

        } else {

            res.send(data);

        }

    })

}

exports.update = (req, res) => {
    if (!req.body.observacao || !req.body.produtos_idprodutos || !req.body.pedidos_idpedidos) {
        res.status(400).send({
            message: "Conteúdo do corpo da requisição vazia."
        });
    } else {
        const produtoPedido = new ProdutoPedidoModel({
            observacao: req.body.observacao,
            produtos_idprodutos: req.body.produtos_idprodutos,
            pedidos_idpedidos: req.body.pedidos_idpedidos
        });


        ProdutoPedidoModel.updateById(req.params.produtoPedidoId, produtoPedido, (err, data) => {
            if (err) {
                if (err.type == "not_found") {
                    res.status(404).send({
                        message: "Produto não encontrado."
                    })
                } else {
                    res.status(500).send({
                        message: "Erro ao atualizar produto."
                    })
                }
            } else {
                res.send(data);
            }
        });
    }
}
exports.delete = (req, res) => {

    ProdutoPedidoModel.remove(req.params.produtoPedidoId, (err, data) => {
        if (err) {
            if (err.type == "not_found") {
                res.status(404).send({ message: "Pedido do produto não encontrado" })
            } else {
                res.status(500).send({ message: "erro ao deletar pedido do produto" })
            }
        } else {
            res.send({ message: "pedido do produto deletado com sucesso" });
        }
    })
}

exports.deleteByPedido = (req, res) => {

    ProdutoPedidoModel.removeByPedido(req.params.produtoPedidoId, (err, data) => {

        if (err) {

            if (err.type == "not_found") {

                res.status(404).send({ message: "Pedido do produto não encontrado" });

            } else {

                res.status(500).send({ message: "Erro ao deletar pedido do produto" });

            }

        } else {

            res.send({ message: "Pedido do produto deletado com sucesso" });

        }

    })

}




exports.deleteByProduto = (req, res) => {

    ProdutoPedidoModel.removeByProduto(req.params.produtoPedidoId, (err, data) => {

        if (err) {

            if (err.type == "not_found") {

                res.status(404).send({ message: "Pedido do produto não encontrado" });

            } else {

                res.status(500).send({ message: "Erro ao deletar pedido do produto" });

            }

        } else {

            res.send({ message: "Pedido do produto deletado com sucesso" });

        }

    })

}

exports.deleteAll = (req, res) => {
    ProdutoPedidoModel.removeAll((err, data) => {
        if (err) {
            res.status(500).send({ message: "Erro ao deletar pedido do produto." })
        } else {
            res.send({ message: "TODOS os pedidos dos produtos deletado com sucesso" })
        }
    })
}
