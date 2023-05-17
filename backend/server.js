const express = require("express");
const app = express();

app.use(express.urlencoded({extended:true}));

app.get("/", (resq, res) => {
    res.json({
        message: "Bem vindo á API MVC do senac"
    })
});
app.listen(3000, () => {
    console.log("servidor rodando na porta 3000");
})