import React from "react";
import TrainerSidebar from "./TrainerSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
const baseUrl = "http://127.0.0.1:8000/api/elearning";

function EditChapter() {
  

  useEffect(() => {
    document.title = "Update Chapter";
  });

  const [ChapterData, setChapterData] = useState({
    course: "",
    title: "",
    description: "",
    old_video:"",
    video: "",
    remarks: "",
  });

  const handleChange = (event) => {
    setChapterData({
      ...ChapterData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setChapterData({
      ...ChapterData,
      [event.target.name]: event.target.files[0],
    });
  };
  const { chapter_id } = useParams();
  const submitForm = () => {
    const _FormData = new FormData();
    _FormData.append("course", ChapterData.course);
    _FormData.append("title", ChapterData.title);
    _FormData.append("description", ChapterData.description);
    if (ChapterData.video !==''){
        _FormData.append("video", ChapterData.video, ChapterData.video.name);
    }
    _FormData.append("remarks", ChapterData.remarks);

    try {
      axios
        .put(baseUrl + "/chapter/"+chapter_id, _FormData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        }).then((res) => {
            if(res.status===200){
                Swal.fire({
                    title:'Data has been updated',
                    icon:'success',
                    toast:true,
                    timer: 3000,
                    position:'top-right',
                    timerProgressBar:true,
                    showCancelButton:false
                });
              }
        });
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(cats)
  // {course_id}=useParams();

  useEffect(()=>{
    try{
      axios.get(baseUrl+'/chapter/'+chapter_id).then((res)=>{
        setChapterData(
            {
            course:res.data.course,
            title:res.data.title,
            description:res.data.description,
            old_video:res.data.video,
            remarks:res.data.remarks,
            video:''
            });
      });
    }catch(error){
      console.log(error)
    }
  },[]);

  return (
    <div className="container-fluid main_container">
      <div className="row">
        <aside className="col-md-2">
          <TrainerSidebar />
        </aside>
        <section className="col-md-9  mt-3">
          <div className="card">
            <h5 className="card-header">Update Chapter</h5>
            <div className="card-body">
              <div className="mb-3">
                <label for="title" className="form-label"> Title</label>
                <input value={ChapterData.title} onChange={handleChange} name="title" type="text" id="title" className="form-control"/>
              </div>
              <div className="mb-3">
                <label for="description" className="form-label">Description</label>
                <div className="col-sm-10">
                  <textarea value={ChapterData.description} onChange={handleChange} name="description" className="form-control"></textarea>
                </div>
              </div>
              <div className="mb-3">
                <label for="video" className="form-label">Video</label>
                <input onChange={handleFileChange} name="old_video" type="file" className="form-control"/>
                {ChapterData.old_video &&
                  <video controls width="100%" className="mt-2">
                      <source src={ChapterData.old_video} type="video/mp4" />
                      Sorry your browser dosen't support emedded video.
                  </video>
                }
                <div className="col-sm-10"></div>
              </div>
              <div className="mb-3">
                <label for="remark" className="form-label"> Remarks </label>
                <input value={ChapterData.remarks} onChange={handleChange} name="remarks" type="text" id="remark" className="form-control" placeholder="This video is focused on basic introduction" />
              </div>
              <button type="button" onClick={submitForm} className="btn btn-primary">Update</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default EditChapter;
