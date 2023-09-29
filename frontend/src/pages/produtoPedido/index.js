import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { FaEdit, FaWindowClose, FaExclamation} from 'react-icons/fa';
import api from '../../services/api';
import Navbar from "../../components/Navbar";
import { ProdutoPedidoContainer } from "./style";

 

const ProdutoPedidos = () => {

    const [produtoPedido, setProdutoPedido] = useState([]);

    const [error, setError] = useState('');

 

    useEffect(() => {

        async function getData(){

            const response = await api.get('/produtos_pedidos');

            setProdutoPedido(response.data);

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

       

        try{

           await api.delete(`/produtos/${id}`);

            const novosProdutos = [...produtoPedido];

            novosProdutos.splice(index, 1);

            setProdutoPedido(novosProdutos);

        }catch(err){

            setError('Houve um problema ao excluir os dados.');

        }

    };

 

    return(

        <div>
            <Navbar/>
            <h1>Listagem de pedidos de Produtos</h1>

            {error && <p>{error}</p>}

            <ProdutoPedidoContainer>

                <div>

                    <span>ID</span>

                    <span>obs</span>

                    <span>ID do produto</span>

                    <span>ID do pedido</span>

                    <span>Editar</span>

                    <span>Excluir</span>

                </div>

                {produtoPedido.map((produtoPedido, index) =>(

                    <div key={String(produtoPedido.idprodutos_pedidos)}>

                        <span>{produtoPedido.idprodutos_pedidos}</span> 

                        <span>{produtoPedido.observacao}</span>

                        <span>{produtoPedido.produtos_idprodutos}</span>

                        <span>{produtoPedido.pedidos_idpedidos}</span>

                        <Link to={`/produtos_pedidos/${produtoPedido.idprodutos_pedidos}`}>

                            <FaEdit size={16}/>

                        </Link>

                        <Link onClick={handleDeleteAsk} to={`/produtos_pedidos/${produtoPedido.idprodutos_pedidos}`}>

                            <FaWindowClose size={16}/>

                        </Link>

                        <FaExclamation

                            size={16}

                            display="none"

                            cursor="pointer"

                            onClick={(e) => handleDelete(e, produtoPedido.idprodutos_pedidos, index)}

                        />

                    </div>

                ))}

            </ProdutoPedidoContainer>

        </div>

    );

};

 

export default ProdutoPedidos;