"use client";
import { useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.js"

export default function BasicReact() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

    function firstnameChange(event) {
        //console.log(event.target.value);
        setFirstname(event.target.value);
    }

    function lastnameChange(event) {
        //console.log(event.target.value);
        setLastname(event.target.value);
    }

    function buttonClick() {
        if (firstname.length == 0) {
            alert("Please Enter your firstname");
        }
    }

    return (
        <main>
            <div className="container">
                <div className="row">
                    <div className="col-12 mb-3">
                        <label htmlFor="">Firstname: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={firstname}
                            onChange={(event) =>
                                setFirstname(event.target.value)
                            }
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="">Lastname: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={lastname}
                            onChange={lastnameChange}
                        />
                    </div>
                    <div className="col-12">
                        Full name: {firstname} {lastname}
                    </div>
                    <div className="col-12">
                        <button onClick={buttonClick}>CLick</button>
                    </div>
                </div>

                {/* Button trigger modal */}
                <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#test"
                >
                    Launch demo modal
                </button>
                {/* Modal */}
                <div
                    className="modal fade"
                    id="test"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1
                                    className="modal-title fs-5"
                                    id="exampleModalLabel"
                                >
                                    Modal title
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
                                    <div className="col-12">
                                        <p>Test</p>
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
                                    className="btn btn-primary"
                                >
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
