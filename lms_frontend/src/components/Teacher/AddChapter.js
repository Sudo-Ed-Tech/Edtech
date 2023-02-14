import React from "react";
import TrainerSidebar from "./TrainerSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const baseUrl = "http://127.0.0.1:8000/api/elearning";

function AddChapter() {
  

  useEffect(() => {
    document.title = "Add Chapter";
  });

  const [ChapterData, setChapterData] = useState({
    course: "",
    title: "",
    description: "",
    video: "",
    note_file:"",
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
  const { course_id } = useParams();
  const submitForm = () => {
    const _FormData = new FormData();
    _FormData.append("course", course_id);
    _FormData.append("title", ChapterData.title);
    _FormData.append("description", ChapterData.description);
    _FormData.append("video", ChapterData.video);
    _FormData.append('note_file',ChapterData.note_file);
    _FormData.append("remarks", ChapterData.remarks);

    try {
      axios.post(baseUrl + "/chapter/", _FormData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          // console.log(res.data);
          window.location.href = "/all-chapters/"+course_id;
        });
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(cats)

  return (
    <div className="container-fluid main_container">
      <div className="row">
        <aside className="col-md-2">
          <TrainerSidebar />
        </aside>
        <section className="col-md-9 mt-3">
          <div className="card">
            <h5 className="card-header">Add Chapter</h5>
            <div className="card-body">
              <div className="mb-3">
                <label for="title" className="form-label">Title</label>
                <input onChange={handleChange}name="title"type="text"id="title"className="form-control" />
              </div>
              <div className="mb-3">
                <label for="description" className="form-label"> Description</label>
                <div className="col-sm-10">
                  <textarea onChange={handleChange} name="description"className="form-control"></textarea>
                </div>
              </div>
              <div className="mb-3">
                <label for="video" className="form-label">Video</label>
                <input onChange={handleFileChange}name="video"type="file"className="form-control"/>
                <div className="col-sm-10"></div>
              </div>
              <div className="mb-3">
                <label for="file" className="form-label">Note</label>
                <input onChange={handleFileChange}name="note_file"type="file"className="form-control"/>
                <div className="col-sm-10"></div>
              </div>
              <div className="mb-3">
                <label for="remark" className="form-label">Remarks</label>
                <input  onChange={handleChange} name="remarks"type="text"id="remark" className="form-control"placeholder="This video is focused on basic introduction"/>
              </div>
              <button type="button" onClick={submitForm}className="btn btn-primary">Add</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AddChapter;
