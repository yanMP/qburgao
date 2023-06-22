const sql = require("./db.js");
//construtor
const ProdutoPedidoModel = function (produtoPedido) {
    this.observacao = produtoPedido.observacao;
    this.produtos_idprodutos = produtoPedido.produtos_idprodutos;
    this.pedidos_idpedidos = produtoPedido.pedidos_idpedidos;
}


//cria novo produtoPedido no banco
ProdutoPedidoModel.create = (produtoPedido, result) => {
    sql.query("insert into produtos_pedidos set ?", produtoPedido, (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(err, null);
            return;
        }

        console.log("pedido do produto criado: ", { idprodutos_pedidos: res.insertId, ...produtoPedido });
        result(null, { idprodutos_pedidos: res.insertId, ...produtoPedido });
    })
};
//seleciona produto por ID
ProdutoPedidoModel.findById = (produtoPedidoId, result) => {

    sql.query("select * from produtos_pedidos where idprodutos_pedidos = " + produtoPedidoId, (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(null, err);
            return;
        }
        if (res.length) {
            console.log("pedido do produto encontrado", res[0]);
            result(null, res[0]);
        } else {
            result({ type: "not_found" }, null);
            console.log("pedido do produto não encontrado");
        }
    })

};

ProdutoPedidoModel.findByPedido = (pedidoId, result) => {

    sql.query("select * from produtos_pedidos where pedidos_idpedidos = " + produtoPedidoId, (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(null, err);
            return;
        }
        if (res.length) {
            console.log("pedido encontrado", res[0]);
            result(null, res[0]);
        } else {
            result({ type: "not_found" }, null);
            console.log("pedido não encontrado");
        }
    })

};

ProdutoPedidoModel.findByproduto = (produtoId, result) => {

    sql.query("select * from produtos_pedidos where produtos_idprodutos = " + produtoPedidoId, (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(null, err);
            return;
        }
        if (res.length) {
            console.log("produto encontrado", res[0]);
            result(null, res[0]);
        } else {
            result({ type: "not_found" }, null);
            console.log("produto não encontrado");
        }
    })

};

//seleciona todos os produtos
ProdutoPedidoModel.getAll = result => {
    sql.query("SELECT * FROM produtos_pedidos", (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(null, err);
            return;
        }
        console.log("pedido do produto: ", res);
        result(null, res);
    })
};





//atualizar produto por id
ProdutoPedidoModel.updateById = ( produtoPedidoId, produtoPedido, result) => {
    sql.query("UPDATE produtos_pedidos SET observacao = ?, produtos_idprodutos = ?, pedidos_idpedidos = ? WHERE idprodutos_pedidos = ?",
        [produtoPedido.observacao, produtoPedido.produtos_idprodutos, produtoPedido.pedidos_idpedidos,  produtoPedidoId], (err, res) => {
            if (err) {
                console.log("erro: ", err);
                result(null, err);
            } else if (res.affectedRows == 0) {
                result({ type: "not_found" }, null);
            } else {
                console.log("Pedido do produto atualizado: ", { idprodutos_pedidos: produtoPedidoId, ...produtoPedido });
                result(null, { idprodutos_pedidos: produtoPedidoId, ...produtoPedido });
            }
        })

};

//remover produto por ID
ProdutoPedidoModel.remove = (produtoPedidoId, result) => {
    sql.query("DELETE FROM produtos_pedidos WHERE idprodutos_pedidos = ?", produtoPedidoId, (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(err, null);
        } else if (res.affectedRows == 0) {
            result({ type: "not_found" }, null);
        } else {
            result(null, res);
        }
    });
};

ProdutoPedidoModel.removeByPedido = (produtoPedidoId, result) => {
    sql.query("DELETE FROM produtos_pedidos WHERE pedidos_idpedidos = ?", produtoPedidoId, (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(err, null);
        } else if (res.affectedRows == 0) {
            result({ type: "not_found" }, null);
        } else {
            result(null, res);
        }
    });
};

ProdutoPedidoModel.removeByProduto = (produtoPedidoId, result) => {
    sql.query("DELETE FROM produtos_pedidos WHERE produtos_idprodutos = ?", produtoPedidoId, (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(err, null);
        } else if (res.affectedRows == 0) {
            result({ type: "not_found" }, null);
        } else {
            result(null, res);
        }
    });
};

//remover todos os produtos
ProdutoPedidoModel.removeAll = (result) => {
    sql.query("DELETE FROM produtos_pedidos", produtoPedidoId, (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(err, null);
        } else if (res.affectedRows == 0) {
            result({ type: "not_found" }, null);
        } else {
            result(null, res);
        }
    });
};
module.exports = ProdutoPedidoModel;
