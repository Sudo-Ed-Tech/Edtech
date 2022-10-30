import React from "react";
import { Link, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api/elearning';


function LearningPage(){

    const [chapterData, setchapterData]=useState([]);
    let {course_id}=useParams();

    useEffect(()=>{
        try{
            axios.get(baseUrl+'/course-chapters/'+course_id).then((res)=>{
                setchapterData(res.data)
            })
        }catch(error){
            console.log(error);
        }
    }, []);

    // Video
    const VideoFile = ()=>{
        {chapterData.map((chapter, index)=>(
          window.location=chapter.video
        ))
        }
    }

    //Download File
    const NoteFile = ()=>{
        {chapterData.map((chapter, index)=>(
          window.location.href=chapter.note_file
        ))}
    }

    return(
        <div className="container-fluid main_container mt-3">
            <div className='row'>
                    <h2 className="fs-4"><strong>Chapters</strong></h2>
                    <hr />
                    { chapterData.map((chapter, index) => (
                        <>
                        <div>
                            <Link to={'/learning-course/'+course_id+'/'+chapter.id} style={{textDecoration:'none'}} className='text-dark fs-5'>{chapter.title}</Link>
                        </div>
                        <hr />
                        </>
                    ))}
                </div>
        </div>
    )
}

export default LearningPage;