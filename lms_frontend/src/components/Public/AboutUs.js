import React from "react";
import {useEffect, useState} from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import "./css/about.css";

const baseUrl='http://127.0.0.1:8000/api/public';
function AboutUs() {

    const [aboutus, setaboutus]=useState([]);
    
   
    
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/about-us/').then((res)=>{
                setaboutus(res.data)
            })

      
          }catch(e){
            console.log(e)
          }
        },[])
    
    //Redication
    const SocialLinkedin = ()=>{
        {aboutus.map((about, index)=>(
            window.location.href=about.social_linkedin
        ))
        }
        }
    const SocialGithub = ()=>{
        {aboutus.map((about, index)=>(
            window.location.href=about.social_github
        ))
        }
        }
    const SocialTwitter = ()=>{
        {aboutus.map((about, index)=>(
            window.location.href=about.social_twitter
        ))
        }
        }
    return( 
        <div className="container mt-5">
            <div className="bg-primary py-1 px-2 mb-5 fs-6 text-light" ><h5>Our Team</h5></div>
            <br />
          <div className="row">
            { aboutus.map((about, index) => (
                <div className="col-md-3 mb-4">
                    <div className="card w-100 card-edge card-card-dec">
                         <img src={about.profile_img} className="mx-auto img-rounded border border-3 border-light" width={170} height={170} alt={about.full_name} />
                
                        <div className="card-body">
                            <h5 className="card-title TCenter py-1">
                                <span >{about.full_name}</span>
                                <p className=" fs-6">{about.designation}</p>
                            </h5>
                            <p className="py-2 text-justify">{about.details}</p>
                            <hr />
                            <p className="text-center">
                                <Link onClick={SocialLinkedin} style={{textDecoration:'none', color:'black'}} className='px-4 fs-3' ><i className="bi bi-linkedin"></i></Link>
                                <Link onClick={SocialGithub} style={{textDecoration:'none',color:'black'}} className='fs-3'><i class="bi bi-github"></i></Link>
                                <Link onClick={SocialTwitter} style={{textDecoration:'none',color:'black'}} className='px-4 fs-3'><i class="bi bi-twitter"></i></Link>
                            </p> 
                        </div>
                    </div>
                </div>
              ))}
          </div>
        </div>
    )
}

export default AboutUs;
