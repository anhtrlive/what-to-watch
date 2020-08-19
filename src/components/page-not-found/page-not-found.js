import React from 'react';
import {Link} from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <p>HTTP:
        <span>404</span>
      </p>
      <center>
        <Link to="/">HOME</Link>
      </center>
    </div>
  );
};

export default PageNotFound;
