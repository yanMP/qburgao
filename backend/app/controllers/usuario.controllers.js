const bcrypt = require("bcryptjs");

const usuarioModel = require("../models/usuario.model.js");

const config = require("../configs/auth.config.js");

const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario.model.js");




exports.signUp = (req, res) => {

    if(!req.body.email || !req.body.senha || !req.body.tipo){

        res.status(400).send({

            message:"E-mail, senha ou tipo nao eviados."

        })

    } else{

        const usuario = new usuarioModel({

            email: req.body.email,

            senha: bcrypt.hashSync(req.body.senha, 8),

            tipo: req.body.tipo

        })




        usuarioModel.create(usuario, (err, data)=>{

            if(err){

                res.status(500).send({

                    message: err.message || "Ocorreu um erro."

                })

            } else{

                res.send(data);

            }

        })

    }

}




exports.signIn = (req, res) =>{

    usuarioModel.findByEmail(req.body.email, (err, data)=>{

        if(err){

            if(err == "not_found"){

                res.status(404).send({

                    message: "Não foi encontrado usuario com o email digitado."

                })

            } else{

                res.status(500).send({

                    message: "Ocorreu um erro ao buscar email do usuario no sistema."

                })

            }

        } else{

            let validPassword = bcrypt.compareSync(req.body.senha, data.senha);

            if(!validPassword){

                res.status(401).send({

                    acessToken: null,

                    message: "Senha inválida!"

                })

            } else{

                let token = jwt.sign({id: data.idusuarios}, config.secret, {expiresIn: 86400}); //24h

                res.status(200).send({

                    acessToken: token,

                    id: data.idusuarios,

                    email: data.email,

                    tipo: data.tipo

                })

            }

        }

    })

}





exports.findAll = (req, res) => {

    Usuario.getAll((err, data) =>{

        if (err){

            res.status(500).send({

                message: err.message || "Ocorreu erro desconhecido!"

            });

        } else{

            res.send(data);

        }

    });

}




exports.findById = (req, res) => {

    Usuario.findById(req.params.idUsuario, (err, data) =>{

        if(err){

            if(err.type == "not_found"){

                res.status(404).send({

                    message:"Usuario não encontrado. ID: "+req.params.idUsuario

                });

            } else{

                res.status(500).send({

                    message: "Erro ao retornar o usuario com ID: "+req.params.idUsuario

                });

            }

        } else{

            res.send(data);

        }

    })

}





exports.update = (req, res) => {

    if(!req.body.email || !req.body.senha || !req.body.tipo){

        res.status(400).send({

            message: "Conteúdo do corpo da requisicao vazia."

        });

    } else{

        const usuario = new Usuario({

            email: req.body.email,

            senha: bcrypt.hashSync(req.body.senha,8),

            tipo: req.body.tipo

        });

   




        Usuario.updateById(req.params.idUsuario, usuario, (err, data)=>{

            if(err){

                if(err.type == "not_found"){

                    res.status(404).send({

                        message: "Usuario não encontrado."

                    })

                } else{

                    res.status(500).send({

                        message: "Erro ao atualizar usuario."

                    })

                }

               

            } else{

                res.send(data);

            }

        });

    }

}





exports.delete = (req, res) => {

    Usuario.remove(req.params.idUsuario, (err,data)=>{

        if(err){

            if(err.type == "not_found"){

                res.status(404).send({message: "Usuario não encontrado"});

            } else{

                res.status(500).send({message: "Erro ao deletar usuario"});

            }

        } else{

            res.send({message: "Usuario deletado com sucesso"});

        }

    })

}

