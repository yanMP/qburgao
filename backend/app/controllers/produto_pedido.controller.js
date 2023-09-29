const produto_pedidoModel = require("../models/produto_pedido.model.js");

exports.create = (req, res) => {
    if (!req.body.observacao || 
        !req.body.produtos_idprodutos || 
        !req.body.pedidos_idpedidos){
        res.status(400).send({
            message: "Conteúdo do corpo da requisição vazia."
        });
    } else {
        const produto = new produto_pedidoModel({
            observacao: req.body.observacao,
            produtos_idprodutos: req.body.produtos_idprodutos,
            pedidos_idpedidos: req.body.pedidos_idpedidos,
        });

        produto_pedidoModel.create(produto, (err, data) => {
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
    produto_pedidoModel.getAll((err, data) => {
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
    produto_pedidoModel.findById(req.params.produtos_pedidosId, (err, data) => {
        if (err){
            if(err.type == "not_found"){
                res.status(404).send({
                    message: "Produto_Pedido não encontrado. ID: "+req.params.produtos_pedidosId
                });
            } else {
                res.status(500).send({
                message: "Erro ao retornar o produto_pedido com ID: "+req.params.produtos_pedidosId 
                });
            }
        } else {
            res.send(data);
        }
    })
}
exports.update = (req, res) => {
    if (!req.body.observacao || 
        !req.body.produtos_idprodutos || 
        !req.body.pedidos_idpedidos){
        res.status(400).send({
            message: "Conteúdo do corpo da requisição vazia."
        });
    } else {
        const produto = new produto_pedidoModel({
            observacao: req.body.observacao,
            produtos_idprodutos: req.body.produtos_idprodutos,
            pedidos_idpedidos: req.body.pedidos_idpedidos,
        });
        produto_pedidoModel.updateById(req.params.produtos_pedidosId, produto, (err, data) => {
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
    produto_pedidoModel.remove(req.params.produtos_pedidosId, (err, data) => {
        if (err) {
            if (err.type == "not_found"){
                res.status(404).send({message:"Produto não encontrado."})
            } else {
                res.status(500).send({message: "Erro ao deletar produto."})
            }
        } else {
            res.send({message: "Produto deletado com sucesso"});
        }
    })
}

exports.deleteAll = (req, res) => {
    produto_pedidoModel.removeAll((err, data) => {
        
            if(err){
                res.status(500).send({message: "Erro ao deletar produtos_pedidos."})
            } else {
                res.send({message: "TODOS os produtos_pedidos deletado com sucesso."});
            }
   
    })
}


