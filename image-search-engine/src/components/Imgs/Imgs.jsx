import { useContext,useEffect } from 'react';
import { MyContext } from '../../context/MyContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Imgs.css'


const Imgs = () => {
  
const{variable,imagenes,setImagenes,page,setPage,valor, setValorTag}=useContext(MyContext)
let apiKey='IpEk3fjnHgpVlE45mbuHsEq2S-egyTEIKo2_SNSqilM';  

  //scroll busqueda
  useEffect(()=>{
    if(!valor==''){ 
      const fetchImgs= async ()=>{
        let URL= `https://api.unsplash.com/search/photos/?client_id=${apiKey}&query=${valor}&per_page=30&page=${page}`;           
        const response= await fetch(URL);
        const data= await response.json();
        setImagenes((datosPrev)=>datosPrev.concat(data.results));  
      }
        fetchImgs()
    }
  },[page]) 


    return(
    <>
        {    
            variable==1
              &&   
               <InfiniteScroll dataLength={imagenes.length} hasMore={true} next={()=>setPage(page+1)}>  
                 <div className='main-container'>
                     {
                       imagenes.map((img, index)=>{ //esto del indice es porq cada vez q recorremos nos pide q cada elemento tenga su propia key, es decir, el id, o index.
                         return(
                           <div key={index} className='img-container'>
                             <img src={img.urls.regular} alt="" />
                               <div className='text-container'>
                                   {
                                     img.user.location 
                                     ?
                                     (
                                       <p>Location: {img.user.location}</p>
                                     )
                                     :
                                     (
                                       <p>Location: Not found</p>
                                     )
                                   }
       
                                   {
                                     img.alt_description
                                     ?
                                     (
                                       <p>Description: {img.alt_description}</p>
                                     )
                                     :
                                     (
                                       <p>Description: Not found</p>
                                     )
                                   }
                                   <p>Camera: Not found</p>
                                   <div className='cont-tags'>
                                     {img.tags.map((tag,index)=><a className='tags' key={index} onClick={()=>{setValorTag(tag.title)}}>{tag.title}</a>)}
                                   </div>  
                               </div>
                           </div>  
                         )
                       })
                     }
                 </div> 
               </InfiniteScroll> 
        }
       </>   
    )

}

export { Imgs }