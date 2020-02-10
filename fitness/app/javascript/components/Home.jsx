import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">My Fitness Pal</h1>
        <p className="lead">
          Free online calorie counter and diet plan
        </p>
        <hr className="my-4" />
        <Link
          to="/create_user"
          className="btn btn-lg custom-button"
          role="button"
        >
          Login
        </Link>
        {" "}
        <Link
          to="/create_user"
          className="btn btn-lg custom-button"
          role="button"
        >
          Register
        </Link>
      </div>
    </div>
  </div>
);
