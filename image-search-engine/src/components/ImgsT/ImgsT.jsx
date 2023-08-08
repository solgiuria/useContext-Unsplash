import React, { useContext,useEffect } from 'react';
import { MyContext } from '../../context/MyContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import './ImgsT.css'

const ImgsT = () => {
    const{variable,setVariable,imagenesT,setImagenesT,pageT,setPageT,valor,valorTag,setValorTag}=useContext(MyContext)
    let apiKey='IpEk3fjnHgpVlE45mbuHsEq2S-egyTEIKo2_SNSqilM'; 


  useEffect(()=>{
    if(!valor==''){
      const fetchTags= async ()=>{
        setVariable(3)
        let URL= `https://api.unsplash.com/search/photos/?client_id=${apiKey}&query=${valorTag}&per_page=30`;   
        const response= await fetch(URL);
        const data= await response.json();
        setImagenesT(data.results); 
      }
        fetchTags();
    }
  },[valorTag]) 


  useEffect(()=>{
      const fetchTags= async ()=>{ 
       let URL= `https://api.unsplash.com/search/photos/?client_id=${apiKey}&query=${valorTag}&per_page=30&page=${pageT}`;   
       const response= await fetch(URL);
       const data= await response.json();
       setImagenesT((datosPrev)=>datosPrev.concat(data.results));
      }
    fetchTags();

  },[pageT]) 




    return(
      <>
        {
          variable==3
            &&
            <InfiniteScroll dataLength={imagenesT.length} hasMore={true} next={()=>setPageT(pageT+1)}>  
                <div className='main-container'>
                    {
                      imagenesT.map((img, index)=>{ //esto del indice es porq cada vez q recorremos nos pide q cada elemento tenga su propia key, es decir, el id, o index.
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

export { ImgsT }