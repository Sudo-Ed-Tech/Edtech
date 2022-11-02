import React from "react";
import { Link } from "react-router-dom";
import UserSidebar from "./UserSidebar";

function FavoriteCourses() {
  return (
    <div className="container-fluid main_container">
      <div className="row">
        <aside className="col-md-3">
          <UserSidebar />
        </aside>
          <div className="col-md-7 mt-3">
          <div className="card">
            <h5 className="card-header">Favorite Courses</h5>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th> <th>Created</th><th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <td>PHP Development</td>
                  <td>
                    <Link to="/">Afatb Harun</Link>
                  </td>
                  <td>
                    <button className="btn btn-danger btn-sm active"> Delete </button>
                  </td>
                </tbody>
              </table>
            </div>
          </div>
          </div>
      </div>
    </div>
  );
}
export default FavoriteCourses;
