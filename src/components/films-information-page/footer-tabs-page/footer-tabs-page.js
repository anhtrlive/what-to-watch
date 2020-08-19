import PropTypes from "prop-types";
import React from 'react';
import FooterLogo from '../../footer/footer-logo';
import {FilmsList} from '../../moviecard-films-list/films-list';

const FooterTabsPage = (props) => {
  const {genre, moreLikeThis} = props;
  return (
    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>
        <FilmsList movies={moreLikeThis} genre={genre}/>
      </section>
      <FooterLogo />
    </div>
  );
};

FooterTabsPage.propTypes = {
  genre: PropTypes.string,
  moreLikeThis: PropTypes.array,
};

export default FooterTabsPage;
