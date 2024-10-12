"use client";

import "../../css/main.css";
import "../../css/main-back-office.css";
import { useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.js";

import { format } from "date-fns";

export default function SeasonSport() {
    const [banner, setBanner] = useState({
        title: "",
        image: "",
    });

    const [recentgame, setRecentGame] = useState({
        rgtitle: "",
        rgdescription: "",
    });

    const [coach, setCoach] = useState({
        name: "",
        description: "",
        profile: "",
    });

    const [season, setSeason] = useState({
        number: "",
        detail: "",
        image: "",
    });

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

    function saveall_banner() {
        if (banner.title.length == 0) {
            alert("Please provide a title");
        } else if (banner.picture.length == 0) {
            alert("Please provide a background picture");
        } else {
            // CALL API
        }
    }

    function saveall_recentgame() {
        if (recentgame.rgtitle.length == 0) {
            alert("Please provide a title");
        } else if (recentgame.rgdescription.length == 0) {
            alert("Please provide a description");
        } else {
            // CALL API
        }
    }

    function saveall_coach() {
        if (coach.name.length == 0) {
            alert("Please provide a name");
        } else if (coach.profile.length == 0) {
            alert("Please provide a profile picture");
        } else {
            // CALL API
        }
    }

    function saveall_season() {
        if (season.number.length == 0) {
            alert(
                "Please provide a Season and its current number ex. Season 14"
            );
        } else if (season.image.length == 0) {
            alert("Please provide a background image");
        } else {
            // CALL API
        }
    }

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
            const temp = { ...award };
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

    function update_banner(event, key) {
        // key = title
        const temp = { ...banner };
        temp[key] = event.target.value;
        setBanner(temp);
    }

    function update_recentgame(event, key) {
        // key = title
        const temp = { ...recentgame };
        temp[key] = event.target.value;
        setBanner(temp);
    }

    function update_coach(event, key) {
        // key = title
        const temp = { ...coach };
        temp[key] = event.target.value;
        setCoach(temp);
    }

    function update_season(event, key) {
        // key = title
        const temp = { ...season };
        temp[key] = event.target.value;
        setSeason(temp);
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
        <div className="container">
            <div className="row">
                <div className="offset-2 col-8">
                    <h2 className="my-4">Edit Season-Sport Page</h2>

                    {/* Banner Card */}
                    <div className="row mb-4">
                        <div className="col-12">
                            <div className="card">
                                <h4 className="card-header bg-blue text-white">
                                    Banner
                                </h4>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12 mb-3">
                                            <label
                                                htmlFor=""
                                                className="form-label"
                                            >
                                                Banner Title:{" "}
                                            </label>
                                            <input
                                                value={banner.title}
                                                onChange={(event) =>
                                                    update_banner(
                                                        event,
                                                        "title"
                                                    )
                                                }
                                                type="text"
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-12 mb-4">
                                            <label
                                                htmlFor=""
                                                className="form-label"
                                            >
                                                Banner picture:{" "}
                                            </label>
                                            <input
                                                value={banner.picture}
                                                onChange={(event) =>
                                                    update_banner(
                                                        event,
                                                        "picture"
                                                    )
                                                }
                                                type="file"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-12 text-end">
                                            <button
                                                className="btn btn-blue"
                                                onClick={saveall_banner}
                                            >
                                                SAVE
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-12">
                            <div className="card">
                                <h4 className="card-header bg-blue text-white">
                                    Coach
                                </h4>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12 mb-3">
                                            <label
                                                htmlFor=""
                                                className="form-label"
                                            >
                                                Coach Name:{" "}
                                            </label>
                                            <input
                                                value={coach.name}
                                                onChange={(event) =>
                                                    update_coach(event, "name")
                                                }
                                                type="text"
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-12 mb-3">
                                            <label
                                                htmlFor=""
                                                className="form-label"
                                            >
                                                Coach Description:{" "}
                                            </label>
                                            <input
                                                value={coach.description}
                                                onChange={(event) =>
                                                    update_coach(
                                                        event,
                                                        "description"
                                                    )
                                                }
                                                type="text"
                                                className="form-control"
                                            />
                                        </div>

                                        <div className="col-12 mb-4">
                                            <label
                                                htmlFor=""
                                                className="form-label"
                                            >
                                                Coach Profile:{" "}
                                            </label>
                                            <input
                                                value={coach.profile}
                                                onChange={(event) =>
                                                    update_coach(
                                                        event,
                                                        "profile"
                                                    )
                                                }
                                                type="file"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-12 text-end">
                                            <button
                                                className="btn btn-blue"
                                                onClick={saveall_coach}
                                            >
                                                SAVE
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-12">
                            <div className="card">
                                <h4 className="card-header bg-blue text-white">
                                    Recent Game
                                </h4>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12 mb-3">
                                            <label
                                                htmlFor=""
                                                className="form-label"
                                            >
                                                Recent Game Title:{" "}
                                            </label>
                                            <input
                                                value={recentgame.rgtitle}
                                                onChange={(event) =>
                                                    update_recentgame(
                                                        event,
                                                        "rgtitle"
                                                    )
                                                }
                                                type="text"
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-12 mb-4">
                                            <label
                                                htmlFor=""
                                                className="form-label"
                                            >
                                                Recent Game Description:{" "}
                                            </label>
                                            <textarea
                                                value={recentgame.description}
                                                onChange={(event) =>
                                                    update_recentgame(
                                                        event,
                                                        "rgdescription"
                                                    )
                                                }
                                                type=""
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-12 text-end">
                                            <button
                                                className="btn btn-blue"
                                                onClick={saveall_recentgame}
                                            >
                                                SAVE
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-12">
                            <div className="card">
                                <h4 className="card-header bg-blue text-white">
                                    Season
                                </h4>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12 mb-3">
                                            <label
                                                htmlFor=""
                                                className="form-label"
                                            >
                                                Season Number:{" "}
                                            </label>
                                            <input
                                                value={season.number}
                                                onChange={(event) =>
                                                    update_season(
                                                        event,
                                                        "number"
                                                    )
                                                }
                                                type="text"
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-12 mb-3">
                                            <label
                                                htmlFor=""
                                                className="form-label"
                                            >
                                                Season Detail:{" "}
                                            </label>
                                            <textarea
                                                value={season.detail}
                                                onChange={(event) =>
                                                    update_season(
                                                        event,
                                                        "detail"
                                                    )
                                                }
                                                type=""
                                                className="form-control"
                                            />
                                        </div>

                                        <div className="col-12 mb-4">
                                            <label
                                                htmlFor=""
                                                className="form-label"
                                            >
                                                Season Image:{" "}
                                            </label>
                                            <input
                                                value={season.image}
                                                onChange={(event) =>
                                                    update_season(
                                                        event,
                                                        "image"
                                                    )
                                                }
                                                type="file"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-12 text-end">
                                            <button
                                                className="btn btn-blue"
                                                onClick={saveall_season}
                                            >
                                                SAVE
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-12">
                            <div className="card">
                                <h4 className="card-header bg-blue text-white">
                                    Awards
                                </h4>
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
                                                    {award_list.map(
                                                        (data, index) => {
                                                            return (
                                                                <tr
                                                                    key={
                                                                        data.id
                                                                    }
                                                                >
                                                                    <td>
                                                                        <i className="bi bi-pencil text-success me-2"></i>
                                                                        <i
                                                                            onClick={() =>
                                                                                delete_award(
                                                                                    index
                                                                                )
                                                                            }
                                                                            className="bi bi-trash3 text-danger"
                                                                        ></i>
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            data.atitle
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            data.adescription
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    )}
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
                                                        <h1
                                                            className="modal-title fs-5"
                                                            id="exampleModalLabel"
                                                        >
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
                                                                    Title{" "}
                                                                    <span className="text-danger">
                                                                        *
                                                                    </span>
                                                                </label>
                                                                <input
                                                                    value={
                                                                        award.atitle
                                                                    }
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        update_award(
                                                                            event,
                                                                            "atitle"
                                                                        )
                                                                    }
                                                                    className="form-control text-black text-roboto"
                                                                    type="text"
                                                                />
                                                            </div>
                                                            <div className="col-12 mb-3">
                                                                <label htmlFor="">
                                                                    Description{" "}
                                                                    <span className="text-danger">
                                                                        *
                                                                    </span>
                                                                </label>
                                                                <textarea
                                                                    value={
                                                                        award.adescription
                                                                    }
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        update_award(
                                                                            event,
                                                                            "adescription"
                                                                        )
                                                                    }
                                                                    className="form-control  text-black text-roboto"
                                                                    type=""
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
                                            <button
                                                className="btn btn-blue"
                                                onClick={saveall_award}
                                            >
                                                SAVE
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
