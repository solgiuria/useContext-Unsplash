import { useContext} from 'react';
import { MyContext } from '../../context/MyContext';
import './Header.css'
const Header = () => {
    const{fetchImgs,setValor}=useContext(MyContext)
    
    return(
        <div className='search-cont-cont'> 
        <div className='search-container'>
          <input type="text" 
          className='search-input' 
          placeholder='Buscar...' 
          onChange={e=>setValor(e.target.value)}/>
          <button className='search-btn' onClick={()=>fetchImgs()}><i className="bi bi-search"></i></button>
        </div>
      </div>
    )
}

export { Header }