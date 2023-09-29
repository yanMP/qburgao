import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { Nav, NavItems, ToggleButton } from './style';

const Navbar = () => {
    const [showNav, setShowNav] = useState(false);
    return (
        <Nav>
            <h1>Meu App</h1>
            <ToggleButton onClick={() => setShowNav(!showNav)}><FaBars /></ToggleButton>
            <NavItems show={showNav}>
                <Link to="/usuarios">Usuarios</Link>
                <Link to="/produtos">Listagem de produtos</Link>
                <Link to="/cadastroProdutos">Cadastro de produtos</Link>
                <Link to="/pedidos">Lista de pedidos</Link>
                <Link to="/cadastroPedidos">Cadastro de pedidos</Link>
                <Link to="/cadastroprodutopedido">Cadastro de pedidos dos produtos</Link>
                <Link to="/produtos_pedidos">listagem de produto pedido</Link>
                <Link to="/logout">Logout</Link>
            </NavItems>
        </Nav>
    );
};
export default Navbar;