import React from "react";
import TrainerSidebar from "./TrainerSidebar";


function TeacherChnagePassword() {
  return (
    <div className="container-fluid main_container">
      <div className="row">
        <aside className="col-md-2">
          <TrainerSidebar />
        </aside>
        <section className="col-md-9  mt-3">
            <div className="card">
                <h5 className="card-header">Chnage Password</h5>
                <div className="card-body">        
                    <div className="mb-3 row">
                        <label for="inputPassword" className="col-sm-2 col-form-label">New Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="inputPassword" />
                        </div>
                    </div>
                    <hr />
                    <button className="btn btn-primary">Update</button>
                </div>
            </div> 
        </section>
      </div>
    </div>
  );
}

export default TeacherChnagePassword;
