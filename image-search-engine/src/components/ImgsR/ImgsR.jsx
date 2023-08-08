import React, { useContext,useEffect } from 'react';
import { MyContext } from '../../context/MyContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import './ImgsR.css'

const ImgsR = () => {
    const{variable,setVariable,imagenesR,setImagenesR,pageR,setPageR,valor}=useContext(MyContext)
    let apiKey='IpEk3fjnHgpVlE45mbuHsEq2S-egyTEIKo2_SNSqilM'; 

  useEffect(()=>{
    if(valor==''){
        const fetchRandomImgs=async()=>{
          setVariable(2)
          let urlRandom=`https://api.unsplash.com/photos/random?count=30&client_id=${apiKey}`;    
          const response= await fetch(urlRandom);
          const data= await response.json();
          setImagenesR((data));
        }
          fetchRandomImgs();
    }
    
  },[valor]) 

  useEffect(()=>{
    if(valor=='' || valor==null){
      const fetchRandomImgs=async()=>{
        let urlRandom=`https://api.unsplash.com/photos/random?count=30&client_id=${apiKey}&page=${pageR}`;
        const response= await fetch(urlRandom);
        const data= await response.json();
        setImagenesR((datosPrev)=>datosPrev.concat(data));
      }
        fetchRandomImgs();
    }
  },[pageR])

    return(
        <>
            {
                variable==2
                &&
                <InfiniteScroll dataLength={imagenesR.length} hasMore={true} next={()=>setPageR(pageR+1)}> 
                    <div className='main-container'>
                        {
                            imagenesR.map((imgR, index)=>{ 
                                return(
                                    <div key={index} className='img-container-R'>
                                        <img src={imgR.urls.regular} alt="" />
                                        <div  className='text-container-R'>
                                            {
                                            imgR.user.location 
                                            ?
                                            (
                                            <p>Location: {imgR.user.location}</p>
                                            )
                                            :
                                            (
                                            <p>Location: Not found</p>
                                            )
                                            }
                                                
                                            {
                                            imgR.alt_description
                                            ?
                                            (
                                            <p>Description: {imgR.alt_description}</p>
                                            )
                                            :
                                            (
                                            <p>Description: Not found</p>
                                            )
                                            }
                    
                                            {
                                            imgR.exif.model
                                            ?
                                            (
                                            <p>Camera: {imgR.exif.model}</p>
                                            )
                                            :
                                            (
                                            <p>Camera: Not found</p>
                                            )
                                            }
                                            <p>Tags: Not found</p>
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

export { ImgsR }