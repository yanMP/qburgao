import React, { useState, useEffect } from "react";

import { Link } from 'react-router-dom';

import { FaEdit, FaWindowClose, FaExclamation} from 'react-icons/fa';

import api from '../../services/api';
import Navbar from "../../components/Navbar";
import { UsuarioContainer } from "./style";

 

const Usuarios = () => {

    const [usuarios, setUsuarios] = useState([]);

    const [error, setError] = useState('');

 

    useEffect(() => {

        async function getData(){

            const response = await api.get('/Usuarios');

            setUsuarios(response.data);

        }

        getData();

    }, []);

 

    const handleDeleteAsk = (e) => {

        e.preventDefault();

        const exclamation = e.currentTarget.nextSibling;

        exclamation.setAttribute('display', 'block');

        e.currentTarget.remove();

    };

 

    const handleDelete = async (e, id, index) => {

        e.persist();

        let response = '';

        try{

            response = await api.delete(`/usuarios/${id}`);

            const novosUsuarios = [...usuarios];

            novosUsuarios.splice(index, 1);

            setUsuarios(novosUsuarios);

        }catch(err){

            setError('Houve um problema ao excluir os dados.');

        }

    };

 

    return(

        <div>
            <Navbar/>
            <h1>Listagem de Usuarios</h1>

            {error && <p>{error}</p>}

            <UsuarioContainer>

                <div>

                    <span>ID</span>

                    <span>Email</span>

                    <span>Tipo</span>

                    <span>Editar</span>

                    <span>Excluir</span>

                </div>

                {usuarios.map((usuario, index) =>(

                    <div key={String(usuario.idusuarios)}>

                        <span>{usuario.idusuarios}</span>

                        <span>{usuario.email}</span>

                        <span>{usuario.tipo}</span>

                        <Link to={`/usuarios/${usuario.idusuarios}`}>

                            <FaEdit size={16}/>

                        </Link>

                        <Link onClick={handleDeleteAsk} to={`/usuarios/${usuario.idusuarios}`}>

                            <FaWindowClose size={16}/>

                        </Link>

                        <FaExclamation

                            size={16}

                            display="none"

                            cursor="pointer"

                            onClick={(e) => handleDelete(e, usuario.idusuarios, index)}

                        />

                    </div>

                ))}

            </UsuarioContainer>

        </div>

    );

};

 

export default Usuarios;