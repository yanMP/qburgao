import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Container } from "./style";
import api from "../../services/api";
import Logo from "../../assets/senac.png";
import Navbar from "../../components/Navbar";
const CadastroPedidos = () => {
    const { id } = useParams();
    const [hora, setHora] = useState("");
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!id) return;

        async function getData(){
            try{
                const {data} = await api.get(`/pedidos/${id}`);
                setHora(data.hora);
                setStatus(data.status);
            }catch(err){
                setError("Houve um problema ao carregar os dados do pedido: "+err);
            }
        }
        getData();
    }, [id]);
    

    const handleCadastroPedidos = async e => {
        e.preventDefault();
        if (!hora || !status){
            setError("Preencha todos os dados para se cadastrar");
        } else {
             try {
                if(!id){
                await api.post("/pedidos", {hora, status});
            }else {
                await api.put(`/pedidos/${id}`, {hora, status});
            }
                navigate("/pedidos");
            } catch (err){
                console.log(err);
                setError("Ocorreu um erro ao cadastrar o pedido.")
            }
        }

    }


return (
    <div>
        <Navbar/>
    <Container>
        <Form onSubmit={handleCadastroPedidos}>
            <img src={Logo} alt="logo_senac"/>
            <input
                value={hora}
                type="datetime-local"
                placeholder="Endereço de Hora"
                onChange={e => setHora(e.target.value)}
            />    
            <input 
                value={status}
                type="text"
                placeholder="status"
                onChange={e => setStatus(e.target.value)}
            />
            <button type="submit">Cadastro de pedido</button>
            {error && <p>{error}</p>}
        </Form>
    </Container>
    </div>
)
}

export default CadastroPedidos;