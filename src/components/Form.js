import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Error from './Error';
import useMoneda from '../components/hooks/useMoneda';
import useCriptomoneda from '../components/hooks/useCriptomoneda';
import axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 20px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: white;
    transition: background-color .3s ease;
    &:hover {
        background-color: #326ac0;
        cursor: pointer;
    }
`

const Form = ({guardarMoneda, guardarCriptoMoneda}) => {
    //state del estado de cripto
    const [listadoCripto, guardadListadoCripto] = useState([]);
    const [error, guardarError] = useState(false);
    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar Americano'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra esterlina'},
    ]
    //usar el hook
    const[ moneda, SelectMonedas ] = useMoneda('Elige tu moneda', '', MONEDAS);
    
    const[ criptomoneda, SelectCripto ] = useCriptomoneda('Elige tu criptomoneda', '', listadoCripto);

    //Ejecutar llamado a la Api
    useEffect(() => {
        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
            const resultado = await axios.get(url);
            guardadListadoCripto(resultado.data.Data);
        }
        consultarAPI();
    }, [])

    //Cuando el user hace submit
    const cotizarMoneda = (e) => {
        e.preventDefault();
        
        //validar is ambos campos estan llenos
        if(moneda == '' || criptomoneda === '') {
            guardarError(true);
            return;
        }
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptoMoneda(criptomoneda);
    }

    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="Los campos no deben estar vacios" /> : null}
            <SelectMonedas />
            <SelectCripto />
            <Boton 
                type="submit"
                value="Calcular"
            />
        </form>
    );
};

export default Form;