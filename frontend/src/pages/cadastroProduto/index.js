import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Container } from "./style";
import api from "../../services/api";
import Logo from "../../assets/senac.png";
import Navbar from "../../components/Navbar";

const CadastroProduto = () => {
    const { id } = useParams();
    const [nome, setNome] = useState("");
    const [valor, setValor] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if(!id) return;

        async function getData(){
            try{
                const {data} = await api.get(`/produtos/${id}`);
                setNome(data.nome);
                setValor(data.valor);
            }catch(err){
                setError("Houve um problema ao carregar os dados do produto: "+err);
            }
        }
        getData();
    }, [id]);

    const handleCadastroProduto = async e => {
        e.preventDefault();
        if (!nome || !valor){
            setError("Preencha todos os dados para se cadastrar");
        } else {
            try {
                if(!id){
                await api.post("/produtos", {nome, valor});
            }else {
                await api.put(`/produtos/${id}`, {nome, valor});
            }
                navigate("/produtos");
            } catch (err){
                console.log(err);
                setError("Ocorreu um erro ao cadastrar produto.")
            }
        }

    }


return (
    <div>
        <Navbar/>
    <Container>
        <Form onSubmit={handleCadastroProduto}>
            <img src={Logo} alt="logo_senac"/>
            <input
            value={nome}
                type="text"
                placeholder="Endereço de nome"
                onChange={e => setNome(e.target.value)}
            />    
            <input 
            value={valor}
                type="text"
                placeholder="valor"
                onChange={e => setValor(e.target.value)}
            />
            <button type="submit">Cadastro de produto</button>
            {error && <p>{error}</p>}
        </Form>
    </Container>
    </div>
)
}

export default CadastroProduto;