import React, { useState } from 'react';
import { MyContext } from './MyContext';

const StateCompo = ({children}) => {
    //este es el componente que tiene todos los estados que heredara a sus hijos
    const[imagenes,setImagenes]=useState([])
    const[page,setPage]=useState(1)
  
    const[imagenesT,setImagenesT]=useState([])
    const[pageT,setPageT]=useState(1)
  
    const[imagenesR,setImagenesR]=useState([]) 
    const[pageR,setPageR]=useState(1)  //ACLARACION: hay tres page porq sino e ejecutan ambos scrolls ya q comparten una misma variable
  
    const[valor,setValor]=useState('') 
    const[valorTag,setValorTag]=useState('')
  
    const[variable, setVariable]=useState(1)

    let apiKey='IpEk3fjnHgpVlE45mbuHsEq2S-egyTEIKo2_SNSqilM'; 

    //busqueda
    const fetchImgs= async ()=>{
    setVariable(1)
     let URL= `https://api.unsplash.com/search/photos/?client_id=${apiKey}&query=${valor}&per_page=30`;   
    const response= await fetch(URL);
    const data= await response.json();
     setImagenes(data.results);
    }

    return(
        <MyContext.Provider
        value={{
            imagenes,
            setImagenes,
            page,
            setPage,

            imagenesT,
            setImagenesT,
            pageT,
            setPageT,

            imagenesR,
            setImagenesR,
            pageR,
            setPageR,

            valor,
            setValor,
            valorTag,
            setValorTag,

            variable,
            setVariable,
            fetchImgs,
        }}>
            {children}
        </MyContext.Provider>
    )
}

export { StateCompo }