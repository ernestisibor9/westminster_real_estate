import React from "react";
import "./Hero2.css";
// import { Link } from "react-router-dom";

function Hero2() {
  return (
    <div>
      <div className="herobg mt-5">
        <div class="container">
          <div class="col-md-12">
            <h1 className="agent">
              Do you have a <br />
              Property to sell? <br />
            </h1>{" "}
            <br />
            {/* <Link to = '/list-property' type="button" className="btn btn-outline-light">Click Here</Link> */}
            <button
              type="button"
              class="btn btn-outline-light"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Click here
            </button>
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                      Property Owner Form
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <form action="">
                    <div class="modal-body">
                      <div class="row mb-3">
                        <div class="col">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Owner's FullName"
                            name="owner_name"
                          />
                        </div>
                        <div class="col">
                          <input
                            type="email"
                            class="form-control"
                            placeholder="Email"
                            name="email"
                          />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Phone Number"
                            name="phone"
                          />
                        </div>
                        <div class="col">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="location"
                            name="location"
                          />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col">
                          <select
                            class="form-select"
                            aria-label="Default select example"
                          >
                            <option selected disabled>
                              Property Type
                            </option>
                            <option value="building">Building</option>
                            <option value="land">Land</option>
                            <option value="flat">Flat</option>
                          </select>
                        </div>
                        <div class="col">
                          <select
                            class="form-select"
                            aria-label="Default select example"
                          >
                            <option selected disabled>
                              Transaction Type
                            </option>
                            <option value="building">Buy</option>
                            <option value="rent">Rent</option>
                            <option value="lease">Lease</option>
                          </select>
                        </div>
                      </div>
                      <div class="mb-3">
                        <label
                          for="exampleFormControlTextarea1"
                          class="form-label"
                        >
                          Property Description
                        </label>
                        <textarea
                          class="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          name="description"
                        ></textarea>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="button" class="btn btn-primary">
                        Save changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero2;
