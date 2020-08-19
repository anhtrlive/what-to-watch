import React from 'react';
import PropTypes from 'prop-types';

const linkCheckPlusButton = (Component, ComponentThree) => {
  const LinkCheckPlusButton = ({isAutorized, ...props}) => {
    if (!isAutorized) {
      return <Component {...props} />;
    }
    return <ComponentThree {...props} />;
  };

  LinkCheckPlusButton.propTypes = {
    isAutorized: PropTypes.bool.isRequired,
  };

  return LinkCheckPlusButton;
};

export {linkCheckPlusButton};
