const PedidoModel = require("../models/pedido.model.js");

exports.create = (req, res) => {
    if (!req.body.hora || !req.body.status){
        res.status(400).send({
            message: "Conteúdo do corpo da requisição vazia."
        });
    } else {
        const pedido = new PedidoModel({
            hora: req.body.hora,
            status: req.body.status
        });

     PedidoModel.create(pedido, (err, data) => {
            if (err){
                res.status(500).send({
                    message: err.message || "Ocorreu um erro ao inserir os dados"
                });
            } else {
                res.send(data);
            }
        });
    }
}


exports.findAll = (req, res) => {
 PedidoModel.getAll((err, data) => {
        if (err){
            res.status(500).send({
                message: err.message || "Ocorreu erro desconhecido!"
            });
        } else {
            res.send(data);
        }
    });
}

exports.findById = (req, res) => {
 PedidoModel.findById(req.params.pedidoId, (err, data) => {
        if (err){
            if(err.type == "not_found"){
                res.status(404).send({
                    message: "Pedido não encontrado. ID: "+req.params.pedidoId
                });
            } else {
                res.status(500).send({
                message: "Erro ao retornar o pedido com ID: "+req.params.pedidoId 
                });
            }
        } else {
            res.send(data);
        }
    })
}
exports.update = (req, res) => {
    if (!req.body.hora && !req.body.status){
        res.status(400).send({
            message: "Conteúdo do corpo da requisição vazia."
        });
    } else {
        const pedido = new PedidoModel({
            hora: req.body.hora,
            status:req.body.status
        });
     PedidoModel.updateById(req.params.pedidoId, pedido, (err, data) => {
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
 PedidoModel.remove(req.params.pedidoId, (err, data) => {
        if (err) {
            if (err.type == "not_found"){
                res.status(404).send({message:"pedido não encontrado."})
            } else {
                res.status(500).send({message: "Erro ao deletar pedido."})
            }
        } else {
            res.send({message: "Pedido deletado com sucesso"});
        }
    })
}

exports.deleteAll = (req, res) => {
 PedidoModel.removeAll((err, data) => {
        
            if(err){
                res.status(500).send({message: "Erro ao deletar pedido."})
            } else {
                res.send({message: "TODOS os pedidos deletado com sucesso."});
            }
   
    })
}


