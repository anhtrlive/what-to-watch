import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import MainPage from './components/main-page/main-page';
import SingIn from './components/sing-in-page/sing-in';
import {PureComponent} from 'react';
import {Switch, Route} from 'react-router-dom';
import TabsIformation from './components/films-information-page/films-information-page';
import VideoPlayer from './components/videoplayer/videoplayer';
import {ActionCreator} from './reducer';
import MyList from './components/favourite-movies-page/my-list';
import AddNewReview from './components/add-new-review-page/add-new-review-page';
import PageNotFound from './components/page-not-found/page-not-found';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      couter: 0,
    };
  }
  render() {
    let {films, resetShowCard} = this.props;
    return (
      <Switch>
        <Route path="/" exact render={ () => {
          resetShowCard();
          return <MainPage films={films} genre={`All genres`}/>;
        }
        }/>
        <Route path="/login" exact component={SingIn}/>
        <Route path="/my-list" exact component={MyList}/>
        {/* <Route path="/:genre" exact render={({match}) => {
          const {genre} = match.params;
          return <MainPage genre={genre} films={films} />;
        }}/> */}
        <Route path="/:pathMovieName/play" exact render={({match})=> {
          const {pathMovieName} = match.params;
          return <VideoPlayer pathMovieName={pathMovieName}/>;
        }}/>
        <Route path="/:pathMovieName/add-review" exact render={({match})=> {
          const {pathMovieName} = match.params;
          return <AddNewReview pathMovieName={pathMovieName} films={films}/>;
        }}/>
        <Route path="/:pathMovieName/:activeTab" render={({match})=> {
          const {pathMovieName, activeTab} = match.params;
          return <TabsIformation pathMovieName={pathMovieName} activeTab={activeTab}/>;
        }}/>
        <Route component={PageNotFound} />
      </Switch>
    );
  }
}

App.propTypes = {
  films: PropTypes.array.isRequired,
  resetShowCard: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    films: state.films,
  });
};

const mapDispatchToProps = (dispatch) => ({
  resetShowCard: () => {
    dispatch(ActionCreator.resetShowCard());
  }
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
