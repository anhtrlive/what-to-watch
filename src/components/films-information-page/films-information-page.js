import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {PureComponent} from 'react';
import {ListOftabs} from './tabs-name-list/list-of-tabs';
import {Details} from './tab-details/tab-details';
import {Overview} from './tabs-overview/tab-overview';
import Review from './tab-reviews/tab-reviews';
import {overviewDetailsReview} from '../hocs/overview-details-review';
import {connect} from 'react-redux';
import {shuffleArray} from '../units';
import {Operation} from '../../reducer';
import HeaderTabPage from './header-tabs-page/header-tabs-page';
import FooterTabsPage from './footer-tabs-page/footer-tabs-page';
import {Redirect} from 'react-router-dom';


const TabsWrapped = overviewDetailsReview(Overview, Details, Review);

class TabsIformation extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {films, isAutorized, pathMovieName, activeTab, loadComments} = this.props;

    let filmName;
    let movie = [];
    let moreLikeThis = [];
    if (films.length !== 0) {
      filmName = pathMovieName.toLowerCase().split(`-`).join(` `);
      movie = films.filter((film) => film.name.toLowerCase() === filmName)[0];
      if (movie === undefined) {
        return <Redirect to="/page-not-found" />;
      }
      loadComments(movie.id);
      moreLikeThis = films.filter((film) => (film.genre === movie.genre && film.name !== movie.name));
      moreLikeThis = shuffleArray(moreLikeThis).sort((a, b) => b.id - a.id).slice(0, 4);
    }

    const {name, rating, description,
      director, starrings, runTime, genre, released, scoresCount,
      backgroundImage, posterImage, backgroundColor, id} = movie;

    const stringRaiting = [`bad`, `normal`, `good`][Math.floor(rating / 4)];

    return <Fragment>
      <section className="movie-card movie-card--full" style={{background: `${backgroundColor}`}}>
        <HeaderTabPage
          films={films}
          name={name}
          genre={genre}
          released={released}
          isAutorized={isAutorized}
          movieId={id}
          backgroundImage={backgroundImage}
        />

        <div className="movie-card__wrap movie-card__translate-top" >
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={posterImage} alt={name} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <ListOftabs activeTab={activeTab} />
              {films.length > 0 ? <TabsWrapped
                activeTab={activeTab}
                stringRaiting={stringRaiting}
                rating={rating}
                description={description}
                director={director}
                starrings={starrings}
                scoresCount={scoresCount}
                runTime={runTime}
                genre={genre}
                released={released}
                id={id}
              /> : <Fragment></Fragment>}

            </div>
          </div>
        </div>
      </section>
      <FooterTabsPage moreLikeThis={moreLikeThis} genre={genre} />
    </Fragment>;
  }

}

TabsIformation.propTypes = {
  activeTab: PropTypes.string.isRequired,
  films: PropTypes.array.isRequired,
  isAutorized: PropTypes.bool.isRequired,
  loadComments: PropTypes.func.isRequired,
  pathMovieName: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    films: state.films,
    isAutorized: state.isAutorized,
  });
};

const mapDispatchToProps = (dispatch) => ({
  loadComments: (moveId) => {
    dispatch(Operation.loadComments(moveId));
  }
});

export {TabsIformation};

export default connect(mapStateToProps, mapDispatchToProps)(TabsIformation);
