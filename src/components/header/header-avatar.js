import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../img/avatar.jpg';

const HeaderAvatar = () => {
  return (
    <Link to="/my-list" className="user-block">
      <div className="user-block__avatar">
        <img src={logo} alt="User avatar" width={63} height={63} />
      </div>
    </Link>
  );
};

export default HeaderAvatar;
