const sql = require("./db.js");
//construtor
const ProdutoModel = function(produto){
    this.name = produto.nome;
    this.valor= produto.valor;
}

//cria novo produto no banco
ProdutoModel.create = (produto, result) => {

};
//seleciona produto por ID
ProdutoModel.findById = (produtoId, result) =>{

};

//seleciona todos os produtos
ProdutoModel.getAll =  result =>{
};

//atualizar produto por id
ProdutoModel.updateById = (produtoId, produto ,result) =>{

};

//remover produto por ID
ProdutoModel.remove = (produtoId, result) =>{

};

//remover todos os produtos
ProdutoModel.removeAll = (result) =>{

};
module.exports = ProdutoModel;
