import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.scss";

const ErrorPage = () => {


    return (
        <Fragment>
            {/* <!-- purple x moss 2020 --> */}

            <div class="mainbox">
                <div class="err">4</div>
                <i class="far fa-question-circle fa-spin"></i>
                <div class="err2">4</div>
                <div class="msg">Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?<p>Let's go <Link to={"/"}>Home</Link> and try from there.</p></div>
            </div>
        </Fragment>
    );
};

export default ErrorPage;