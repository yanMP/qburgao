const sql = require("./db.js");
//construtor
const PedidosModel = function (pedido) {
    this.hora = pedido.hora;
    this.status = pedido.status;
}


//cria novo pedido no banco
PedidosModel.create = (pedido, result) => {
    sql.query("insert into pedidos set ?", pedido, (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(err, null);
            return;
        }

        console.log("produto criado: ", { idpedidos: res.insertId, ...pedido });
        result(null, { idpedidos: res.insertId, ...pedido });
    })
};
//seleciona produto por ID
PedidosModel.findById = (pedidoId, result) => {

    sql.query("select * from pedidos where idpedidos = " + pedidoId, (err, res) => {
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

//seleciona todos os produtos
PedidosModel.getAll = result => {
    sql.query("SELECT * FROM pedidos", (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(null, err);
            return;
        }
        console.log("pedido: ", res);
        result(null, res);
    })
};





//atualizar produto por id
PedidosModel.updateById = (pedidoId, pedido, result) => {
    sql.query("UPDATE pedidos SET hora = ?, status = ? WHERE idpedidos = ?",
        [pedido.nome, pedidoId.valor, pedidoId], (err, res) => {
            if (err) {
                console.log("erro: ", err);
                result(null, err);
            } else if (res.affectedRows == 0) {
                result({ type: "not_found" }, null);
            } else {
                console.log("Pedido atualizado: ", { idpedidos: pedidoId, ...pedido });
                result(null, { idpedidos: pedidoId, ...pedido });
            }
        })

};

//remover produto por ID
PedidosModel.remove = (pedidoId, result) => {
    sql.query("DELETE FROM pedidos WHERE idpedidos = ?", pedidoId, (err, res) => {
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
PedidosModel.removeAll = (result) => {
    sql.query("DELETE FROM pedidos", pedidoId, (err, res) => {
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
module.exports = PedidosModel;
