import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

const overviewDetailsReview = (Component, ComponentTwo, ComponentThree) => {
  const OverviewDetailsReview = ({activeTab, ...props}) => {
    if (activeTab === `overview`) {
      return <Component {...props} />;
    } else if (activeTab === `details`) {
      return <ComponentTwo {...props} />;
    } else if (activeTab === `review`) {
      return <ComponentThree {...props} />;
    } else {
      return <Redirect to="/page-not-found" />;
    }
  };

  OverviewDetailsReview.propTypes = {
    activeTab: PropTypes.string.isRequired,
  };

  return OverviewDetailsReview;
};

export {overviewDetailsReview};
