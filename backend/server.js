const express = require("express");
const app = express();

app.use(express.urlencoded({extended:true}));

app.get("/", (resq, res) => {
    res.json({
        message: "Bem vindo á API MVC do senac"
    })
});
require("./app/routes/produto.routes.js")(app);
require("./app/routes/pedidos.routes.js")(app);
require("./app/routes/produto_pedido.routes.js")(app);
require("./app/routes/usuario.routes.js")(app);



app.listen(3000, () => {
    console.log("servidor rodando na porta 3000");
})