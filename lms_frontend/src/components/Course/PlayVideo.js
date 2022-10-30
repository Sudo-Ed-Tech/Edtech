import React from "react";
import { Link, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import ChapterList from './ChapterList';
const baseUrl='http://127.0.0.1:8000/api/elearning';



function LearningPage(){

    const [chapterData, setchapterData]=useState([]);
    let {course_id}=useParams();
    let {chapter_id}=useParams();

    useEffect(()=>{
        try{
            axios.get(baseUrl+'/course-chapters/'+course_id+'/'+chapter_id).then((res)=>{
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
        ))
        }
    }

    return(
        <div className="container-fluid main_container mt-3">
            <div className='row'>
                <div className='col-md-3'>
                    <ChapterList />
                </div>
                <div className='col-md-8'>
                    <div>
                        <video controls width="500">
                            <source src={chapterData.video} type="video/mp4" />
                            Sorry your browser dosen't support emedded video.
                        </video>
                        
                    </div>
                    <hr/>
                    <div className="float-end">
                        <Link onClick={NoteFile} style={{textDecoration:'none'}}>Download Note</Link>
                    </div>
                    <div>
                        <p></p>
                    <h2 className="fs-4"><strong>Description</strong></h2>
                        {chapterData.description}</div>
                </div>
            </div>
        </div>
    )
}

export default LearningPage;