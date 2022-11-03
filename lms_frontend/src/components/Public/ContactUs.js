import React from "react";
import { Link } from "react-router-dom";
import "./css/about.css";

const baseUrl='http://127.0.0.1:8000/api/public';
function ContactUs() {

    return( 
        <div className="container px-0 mt-5">
            <div className="bg-primary py-1 px-2 mb-5 fs-6 text-light" ><h5>Contact Us</h5></div>
            <div className="row">
                <div className="col-md-4 mb-6 py-2">
                    <div className="text-center">
                        <img src="/Assets/contact-us/support.svg" className="mb-1" width="65" />
                        <h6 className="mb-0"> Support</h6>
                        <a href="malto:hr@koenig-solutions.com" className="email">support@didactic-solutions.com</a>
                    </div>
                </div>
                <div className="col-md-4 mb-4 ">
                    <div className="text-center">
                        <img src="/Assets/contact-us/hr.svg" className="mb-1" width="65" />
                        <h6 className="mb-0"> Human Resources</h6>
                        <a href="malto:hr@koenig-solutions.com" className="email">hr@didactic-solutions.com</a>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="text-center ">
                        <img src="/Assets/contact-us/hr.svg" className="mb-1" width="65" />
                        <h6 className="mb-0">Partnering</h6>
                        <a href="malto:hr@koenig-solutions.com" className="email">partner@didactic-solutions.com</a>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="text-center">
                        <img src="/Assets/contact-us/support.svg" className="mb-1" width="65" />
                        <h6 className="mb-0"> Support</h6>
                        <a href="malto:hr@koenig-solutions.com" className="email">support@didactic-solutions.com</a>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="text-center">
                        <img src="/Assets/contact-us/hr.svg" className="mb-1" width="65" />
                        <h6 className="mb-0"> Human Resources</h6>
                        <a href="malto:hr@koenig-solutions.com" className="email">hr@didactic-solutions.com</a>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="text-center ">
                        <img src="/Assets/contact-us/hr.svg" className="mb-1" width="65" />
                        <h6 className="mb-0">Partnering</h6>
                        <a href="malto:hr@koenig-solutions.com" className="email">partner@didactic-solutions.com</a>
                    </div>
                </div>
            </div>
            <hr />
            <p className="fs-4">Local Sales Office</p>
            <div className="row m-0">
            <div class="col-md-7">
                <div class="contact-content">
                    <span className="fs-5">Mumbai</span>
                    <div class="content">
                        <address>
                            <span className="fs-5">Didactic Solutions Pvt. Ltd. </span>
                            <span> -Mumbai, Second Floor,</span>
                            <span>Somewhere, Somewhere</span>
                            <span>Somewhere Phase 5, Sector 54,</span>
                            <span>Mumbai -400001 (India)</span>
                        </address>
                    </div>
                </div>
                <div class="contact-content">
                    <span className="fs-5">Delhi</span>
                    <div class="content">
                        <address>
                            <span className="fs-5">Didactic Solutions Pvt. Ltd.</span>
                            <span> - DSM-640-641, 6th Floor,</span>
                            <span>DLF Tower, Shivaji Marg,</span>
                            <span>Moti Nagar,</span>
                            <span>New Delhi-110015(India)</span>
                        </address>
                    </div>
                </div>
                <div class="contact-content">
                    <span className="fs-5">Bangalore (Bengaluru)</span>
                    <div class="content">
                        <address>
                            <span className="fs-5">Didactic Solutions Pvt. Ltd.</span>
                            <span> - 12th floor SKAV (Rockline Seethalaxmi) Building C-39,</span>
                            <span>Kasturba Rd, Shanthala Nagar, Sampangi Rama Nagar,</span>
                            <span>Bengaluru, Karnataka-560001 (India)</span>
                        </address>
                    </div>
                </div>
            </div>
                <div className="col-md-5">
                <div className="card">
            <h5 className="card-header">Enquire Now</h5>
            <div className="card-body">
              <div className="mb-3">
                <input name="title"type="text"className="form-control" placeholder="Name"/>
              </div>
              <div className="mb-3">
                <input name="title"type="email" className="form-control" placeholder="Email"/>
              </div>
              <div className="mb-3">
                <input name="title"type="text"id="title"className="form-control" placeholder="Phone"/>
              </div>
              <div className="mb-3">
                <input name="title"type="text"id="title"className="form-control" placeholder="Subject"/>
              </div>
              <div className="mb-3">
                  <textarea name="description"className="form-control" placeholder="Message"></textarea>
              </div>
              <button type="button" className="btn btn-warning px-4">Submit</button>
            </div>
          </div>
                </div>
            </div>
        </div>
    )
}
<img src="/assets/media/img/contact-us/icons/08.svg" className="mb-1" width="65"></img>

export default ContactUs;
