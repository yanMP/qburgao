import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } 
                                                       from 'react-router-dom';
import { isAuthenticated } from "./services/auth";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Usuarios from "./pages/Usuarios";
import Produtos from "./pages/produto";
import Pedidos from "./pages/pedidos";
import Logout from "./pages/logout";
import CadastroProduto from "./pages/cadastroProduto";
import CadastroPedidos from "./pages/cadastroPedidos";
import CadastroProdutoPedido from "./pages/cadastroProdutoPedido";
import ProdutoPedidos from "./pages/produtoPedido";
import Navbar from "./components/Navbar";

const LoginPage = () => <Login />;
const LogOutPage = () => <Logout />
const SignUpPage = () => <SignUp />;
const UsuariosPage = () => <Usuarios />
const ProdutosPage = () => <Produtos />
const PedidosPage = () => <Pedidos />
const CadastroProdutoPage = () => <CadastroProduto />
const CadastroPedidosPage = () => <CadastroPedidos />
const CadastroProdutoPedidoPage = () => <CadastroProdutoPedido/>
const ProdutoPedidosPage = () => <ProdutoPedidos/>

const NotFoundPage = () => <h1>Page not found.</h1>
const AppPage = () => {
    if (!isAuthenticated()){
        return <Navigate to="/" replace/>
    }
    return <Navbar><h1>Meu App </h1></Navbar>;
    
}

const Rotas = () => (
    <Router>
        <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/app' element={<AppPage />} />
            <Route path='/usuarios' element={<UsuariosPage />} />
            <Route path='/usuarios/:id' element={<SignUpPage />} />
            <Route path='/cadastroProdutos' element={<CadastroProdutoPage />} />
            <Route path='/produtos/:id' element={<CadastroProdutoPage />} />
            <Route path='/cadastroPedidos' element={<CadastroPedidosPage />} />
            <Route path='/pedidos' element={<PedidosPage />} />
            <Route path='/pedidos/:id' element={<CadastroPedidosPage />} />
            <Route path='/produtos' element={<ProdutosPage />} />
            <Route path='/cadastroprodutopedido' element={<CadastroProdutoPedidoPage />} />
            <Route path='/produtos_pedidos' element={<ProdutoPedidosPage />} />
            <Route path='/produtos_pedidos/:id' element={<CadastroProdutoPedidoPage />} />
            <Route path='/logout' element={<LogOutPage />} />
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    </Router>    
);

export default Rotas;
