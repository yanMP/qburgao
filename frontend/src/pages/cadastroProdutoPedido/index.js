import React, {useState, useEffect} from "react";
import {useNavigate, useParams } from "react-router-dom";
import { Form, Container } from "./style";
import api from "../../services/api";
import Logo from "../../assets/senac.png";
import Navbar from "../../components/Navbar";
const CadastroProdutoPedido = () => {
   const  { id } = useParams();
    const [observacao, setObservacao] = useState("");
    const [produtos_idprodutos, setProdutos_idprodutos] = useState("");
    const [pedidos_idpedidos, setPedidos_idpedidos] = useState("");

    const [produtos, setTableProdutos] = useState ([]);
    const [pedidos, setTablePedidos] = useState([]);
    
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        async function getSelect(){
            try{
                let response = await api.get('/produtos');
                setTableProdutos(response.data);

                response = await api.get('/pedidos');
                setTablePedidos(response.data);
          }catch(err){

          }
        }
        getSelect();

        if(!id) return;

        async function getData(){
            try{
                const {data} = await api.get(`/produtos_pedidos/${id}`);
                setObservacao(data.observacao);
                setProdutos_idprodutos(data.produtos_idprodutos);
                setPedidos_idpedidos(data.pedidos_idpedidos);

              

            }catch(err){
                setError("Houve um problema ao carregar os dados do pedido do produto: "+err);

            }

           
        }
        getData();
    }, [id]);

    const handleCadastroProdutoPedido = async e => {
        e.preventDefault();
        if (!observacao || !produtos_idprodutos || !pedidos_idpedidos){
            setError("Preencha todos os dados para cadastrar");
        } else {
            try {
                if(!id){
                await api.post("/produtos_pedidos", {observacao, produtos_idprodutos, pedidos_idpedidos});
            }else {
                await api.put(`/produtos_pedidos/${id}`, {observacao, produtos_idprodutos, pedidos_idpedidos});
            }
                navigate("/produtos_pedidos");
            } catch (err){
                console.log(err);
                setError("Ocorreu um erro ao registrar sua conta.")
            }
        }

    }


return (
    <div>
        <Navbar/>
    <Container>
        <Form onSubmit={handleCadastroProdutoPedido}>
            <img src={Logo} alt="logo_senac"/>
            <input
                value={observacao}
                type="text"
                placeholder="coloque alguma observação"
                onChange={e => setObservacao(e.target.value)}
            />    

            <select onChange={e => setPedidos_idpedidos(e.target.value)} value={pedidos_idpedidos}>
                <option value="">Selecione um pedido</option>
                {pedidos.map(pedido => (
                    <option key={pedido.idpedidos} value={pedido.idpedidos}>
                        {pedido.idpedidos}
                        </option>
                ))}
                </select>


                <select onChange={e => setProdutos_idprodutos(e.target.value)} value={produtos_idprodutos}>
                <option value="">Selecione um produto</option>
                {produtos.map(produto => (
                    <option key={produto.idprodutos} value={produto.idprodutos}>
                        {produto.idprodutos}
                        </option>
                ))}
                </select>
                <button type="submit">Cadastrar Pedido do produto</button>
                {error && <p>{error}</p>}
            
        </Form>
    </Container>
    </div>
)
}

export default CadastroProdutoPedido;