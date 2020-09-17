import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Form from './components/Form';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';
import axios from 'axios';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media(min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin: 80px 0 50px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`

function App() {
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptoMoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [spinner, guardarSpinner] = useState(false);

  useEffect(() => {

    const cotizarCripto = async () => {
      if(moneda === '') return null;

      //consultar la api
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado  = await axios.get(url);

      guardarSpinner(true);

      //ocultar el spinner
      setTimeout(() => {
        guardarSpinner(false);
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 2000)
    }
    cotizarCripto();
  }, [moneda, criptomoneda]) 
  return (
    <Contenedor>
      <div>
        <Imagen 
          src={imagen}
          alt="Imagen crypto"
        />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>
        <Form 
          guardarCriptoMoneda={guardarCriptoMoneda}
          guardarMoneda={guardarMoneda}
        />
        {spinner ? <Spinner /> : 
           <Cotizacion 
            resultado={resultado}
          />
        }
      </div>
    </Contenedor>
  );
}

export default App;
