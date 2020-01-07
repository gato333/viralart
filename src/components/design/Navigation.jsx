import React from 'react'
import { Link } from "react-router-dom";

export default () => (
  <div className="navigation">
      <Link to="/">Newest</Link>
      <br />
      <Link to="/step/3">Step 3</Link>
      <br />
      <Link to="/step/2">Step 2</Link>
      <br />
      <Link to="/step/1">Step 1</Link>
      <br />
      <Link to="/design">Design</Link>
  </div>
);