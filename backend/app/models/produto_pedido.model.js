const sql = require("./db.js");
//Construtor
const ProdutoPedidoModel = function(produtos_pedidos){
    this.observacao = produtos_pedidos.observacao;
    this.produtos_idprodutos= produtos_pedidos.produtos_idprodutos;
    this.pedidos_idpedidos= produtos_pedidos.pedidos_idpedidos;
}
//Cria novo pedido no banco
ProdutoPedidoModel.create = (produtos_pedidos, result) => {
    sql.query("insert into produtos_pedidos set ?", produtos_pedidos, (err, res) => {
        if (err){
            console.log("Erro: ", err);
            result(err, null);
            return;
        }

        console.log("Produto_Pedido criado: ", {idprodutos_pedidos: res.insertId, ...produtos_pedidos});
        result(null, {idprodutos_pedidos: res.insertId, ...produtos_pedidos});
    })
};

//Seleciona pedido por ID
ProdutoPedidoModel.findById = (produtos_pedidosId, result) => {
    sql.query("Select * from produtos_pedidos where idprodutos_pedidos = "+produtos_pedidosId, (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(null, err);
            return;
        }
        if (res.length) {
            console.log("Produto_Pedido Encontrado", res[0]);
            result(null,res[0]);
        } else {
            result({type: "not_found"}, null);
            console.log("Produto_Pedido não encontrado");
        }
    })
};

//Seleciona todos os pedido
ProdutoPedidoModel.getAll = result => {
    sql.query("SELECT * FROM produtos_pedidos", (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(null, err);
            return;
        }

        console.log("Produto_Pedido: ", res);
        result(null, res);
    })
};
//Atualizar pedido por id
ProdutoPedidoModel.updateById = (produtos_pedidosId, produtos_pedidos, result) => {
    sql.query("UPDATE produtos_pedidos SET observacao = ?, produtos_idprodutos = ?, pedidos_idpedidos = ? WHERE idprodutos_pedidos = ?",
              [produtos_pedidos.observacao, produtos_pedidos.produtos_idprodutos, produtos_pedidos.produtos_idprodutos, produtos_pedidosId], (err, res) => {
                    if (err){
                        console.log("erro: ", err);
                        result(null, err);
                    } else if (res.affectedRows == 0){
                        result({ type: "not_found"}, null);
                    } else {
                        console.log("Produtos Pedido atualizado: ", {idprodutos_pedidos: produtos_pedidosId, ...produtos_pedidos});
                        result(null, {idprodutos_pedidos: produtos_pedidosId, ...produtos_pedidos});
                    }
              });
};
//Remover pedido por id
ProdutoPedidoModel.remove = (produtos_pedidosId, result) => {
    sql.query("DELETE FROM produtos_pedidos WHERE idprodutos_pedidos = ?", produtos_pedidosId, (err, res) =>{
        if (err) {
            console.log("erro: ", err);
            result(err, null);
        } else if (res.affectedRows == 0){
            result({ type: "not_found"}, null);
        } else {
            result(null, res);
        }
    });
};
//Remover todos os pedidoidpedido
ProdutoPedidoModel.removeAll = (result) => {
        sql.query("DELETE FROM produtos_pedidos", (err, res) =>{
            if (err) {
                console.log("erro: ", err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
};

module.exports = ProdutoPedidoModel;