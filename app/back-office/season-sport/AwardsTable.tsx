"use client";

import React, { useState } from "react";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.js";

export default function AwardsTable() {
  const [award, setAward] = useState({
    atitle: "",
    adescription: "",
  });

  const [award_list, set_award_list] = useState([
    {
      id: 1,
      atitle: "seasac 2014 gold medal",
      adescription: "volleyball team won silver medal",
    },
    {
      id: 2,
      atitle: "seasac 2014 gold medal",
      adescription: "volleyball team won silver medal",
    },
    {
      id: 3,
      atitle: "seasac 2014 gold medal",
      adescription: "volleyball team won silver medal",
    },
    {
      id: 4,
      atitle: "seasac 2014 gold medal",
      adescription: "volleyball team won silver medal",
    },
    {
      id: 5,
      atitle: "seasac 2014 gold medal",
      adescription: "volleyball team won silver medal",
    },
  ]);

  function saveall_award() {
    if (award_list.length == 0) {
      alert("Please provide an award");
    } else {
      // CALL API
    }
  }

  function add_award() {
    if (award.atitle.length == 0) {
      alert("Please provide an award's title");
    } else if (award.adescription.length == 0) {
      alert("Please provide an award's description");
    } else {
      const temp = { ...award, id: award_list.length + 1 };
      const temp_list = [...award_list];

      temp_list.push(temp);
      set_award_list(temp_list);
      const modalAward = document.getElementById("awardadd");
      Modal.getInstance(modalAward).hide();

      setAward({
        atitle: "",
        adescription: "",
      });
    }
  }

  function update_award(event, key) {
    // key = title
    const temp = { ...award };
    temp[key] = event.target.value;
    setAward(temp);
  }

  function delete_award(index) {
    const temp = award_list.filter(function (data, i) {
      return i != index;
    });
    set_award_list(temp);
    //TODO remove news api
  }

  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="card">
          <h4 className="card-header bg-blue text-white">Awards</h4>
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <table className="table table-striped table-hover table-backoffice">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Title</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {award_list.map((data, index) => {
                      return (
                        <tr key={data.id}>
                          <td>
                            <i className="bi bi-pencil text-success me-2"></i>
                            <i
                              onClick={() => delete_award(index)}
                              className="bi bi-trash3 text-danger"
                            ></i>
                          </td>
                          <td>{data.atitle}</td>
                          <td>{data.adescription}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-6 text-start">
                <button
                  type="button"
                  className="btn btn-success"
                  data-bs-toggle="modal"
                  data-bs-target="#awardadd"
                >
                  <i className="bi bi-plus-lg me-1 cvvv"></i>
                  Add Awards
                </button>
              </div>
              <div
                className="modal fade"
                id="awardadd"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Add Awards
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-12 mb-3">
                          <label htmlFor="">
                            Title <span className="text-danger">*</span>
                          </label>
                          <input
                            value={award.atitle}
                            onChange={(event) => update_award(event, "atitle")}
                            className="form-control text-black text-roboto"
                            type="text"
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <label htmlFor="">
                            Description <span className="text-danger">*</span>
                          </label>
                          <textarea
                            value={award.adescription}
                            onChange={(event) =>
                              update_award(event, "adescription")
                            }
                            className="form-control  text-black text-roboto"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn btn-blue"
                        onClick={add_award}
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 text-end">
                <button className="btn btn-blue" onClick={saveall_award}>
                  SAVE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
