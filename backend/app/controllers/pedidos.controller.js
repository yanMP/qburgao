const PedidosModel = require("../models/pedidos.model");


exports.create = (req, res) => {
    if (!req.body.hora || !req.body.status) {
        res.status(400).send({
            message: "conteúdo do corpo da requisição vazia;"
        });
    } else {
        const produto = new PedidosModel({
            hora: req.body.hora,
            status: req.body.status
        });
        PedidosModel.create(produto, (err, data) => {
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
    PedidosModel.getAll((err, data) => {
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
    PedidosModel.findById(req.params.pedidoId, (err, data) => {
        if (err) {
            if (err.type == "not_found") {
                res.status(404).send({
                    message: "pedido não encontrado. ID: " + req.params.pedidoId
                });
            } else {
                res.status(500).send({
                    message: "erro ao retornar o pedido com ID: " + req.params.pedidoId
                });
            }
        } else {
            res.send(data);
        }
    })
}
exports.update = (req, res) => {
    if (!req.body.hora || !req.body.status) {
        res.status(400).send({
            message: "Conteúdo do corpo da requisição vazia11."
        });
    } else {
        const pedido = new PedidosModel({
            hora: req.body.hora,
            status: req.body.status
        });


        PedidosModel.updateById(req.params.pedidoId, pedido, (err, data) => {
            if (err) {
                if (err.type == "not_found") {
                    res.status(404).send({
                        message: "Pedido não encontrado."
                    })
                } else {
                    res.status(500).send({
                        message: "Erro ao atualizar pedido."
                    })
                }
            } else {
                res.send(data);
            }
        });
    }
}
exports.delete = (req, res) => {

    PedidosModel.remove(req.params.pedidoId, (err, data) => {
        if (err) {
            if (err.type == "not_found") {
                res.status(404).send({ message: "Pedido não encontrado" })
            } else {
                res.status(500).send({ message: "erro ao deletar pedido" })
            }
        } else {
            res.send({ message: "pedido deletado com sucesso" });
        }
    })
}
exports.deleteAll = (req, res) => {
    PedidosModel.removeAll((err, data)=> {
        if(err){
            res.status(500).send({message: "Erro ao deletar pedido."})
        } else {
            res.send({message: "TODOS os pedidos deletado com sucesso"})
        }
    })
 }
