import React from 'react'
import { Link } from "react-router-dom";

export default () => (
  <div className="navigation">
      <Link to="/">
        <div>Newest</div>
      </Link>
      <Link to="/step/3">
        <div>Step 3</div>
      </Link>
      <Link to="/step/2">
        <div>Step 2</div>
      </Link>
      <Link to="/step/1">
        <div>Step 1</div>
      </Link>
      <Link to="/design">
        <div>Design</div>
      </Link>
  </div>
);