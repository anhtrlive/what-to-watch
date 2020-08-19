import FilmModel from "./components/model/film-model";

const DEFAULT_SHOW_CARDS = 8;
const NUMBER_OF_MORE_CARDS = 20;


const initialState = {
  genre: `All genres`,
  films: [],
  movies: [],
  showcard: DEFAULT_SHOW_CARDS,
  isAutorized: false,
  user: null,
  bookmarks: [],
  comments: [],
};


const showMoreFilter = (length) => {
  return length + NUMBER_OF_MORE_CARDS;
};

const Operation = {
  loadComments: (movieId) => async (dispatch, _, api) => {
    const response = await api.get(`/comments/${movieId}`);
    dispatch(ActionCreator.loadComments(response.data));
  },
  loadFavoriteMovies: () => async (dispatch, _, api) => {
    const response = await api.get(`/favorite`);
    dispatch(ActionCreator.loadFavoriteMovies(response.data));
  },
  addReview: (movieId, body) => async (dispatch, _, api) => {
    const response = await api.post(`/comments/${movieId}`, body);
    dispatch(ActionCreator.loadComments(response.data));
  },
  switchFavorite: (movieId, status) => async (dispatch, _, api) => {
    await api.post(`/favorite/${movieId}/${status}`);
    dispatch(Operation.loadFavoriteMovies());
  },
  loadData: () => async (dispatch, _, api) => {
    const response = await api.get(`/films`);
    dispatch(ActionCreator.loadData(response.data));
  },
  autorized: (email, password) => async (dispatch, _, api) => {
    const user = {
      email,
      password,
    };
    const response = await api.post(`/login`, user);
    if (response.status === 200) {
      dispatch(ActionCreator.loginCheck(response.data));
      dispatch(ActionCreator.checkautorized(true));
      dispatch(Operation.loadFavoriteMovies());
    }
    return response.status;
  },
  checkautorized: () => async (dispatch, _, api) => {
    const response = await api.get(`/login`);
    try {
      if (response.status === 200) {
        dispatch(ActionCreator.loginCheck(response.data));
        dispatch(ActionCreator.checkautorized(true));
        dispatch(Operation.loadFavoriteMovies());
      } else {
        dispatch(ActionCreator.checkautorized(false));
        throw new Error(response.status);
      }
    } catch (error) {
      return error;
    }
    return response.status;
  }
};

const ActionCreator = {
  addMyList: (name) => ({
    type: `ADD_TO_BOOKMARKS`,
    payload: name,
  }),
  loadComments: (comments) => ({
    type: `LOAD_COMMENTS`,
    payload: comments
  }),
  loadFavoriteMovies: (movies) => ({
    type: `LOAD_FAVORITE_MOVIES`,
    payload: movies.map((element) => element.name)
  }),
  showMore: (length) => {
    const showMoreFilterMovies = showMoreFilter(length);

    return {
      type: `ADD_MORE_CARDS_MOVIES`,
      payload: showMoreFilterMovies,
    };
  },
  resetShowCard: () => ({
    type: `RESET_NUMBER_OF_SHOW_CARD`,
    payload: DEFAULT_SHOW_CARDS,
  }),
  loadData: (data) => ({
    type: `LOAD_DATA`,
    payload: data,
  }),

  loginCheck: (data) => ({
    type: `AUTHORIZED`,
    payload: data,
  }),
  checkautorized: (data) => ({
    type: `CHECKAUTORIEZED`,
    payload: data,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `FILTER_MOVIES_BY_GANRE`:
      return Object.assign({}, state, {
        movies: action.payload
      });
    case `ADD_MORE_CARDS_MOVIES`:
      return Object.assign({}, state, {
        showcard: action.payload
      });
    case `LOAD_DATA`:
      return Object.assign({}, state, {
        films: FilmModel.parseFilms(action.payload)
      });
    case `LOAD_COMMENTS`:
      return Object.assign({}, state, {
        comments: action.payload
      });
    case `LOAD_FAVORITE_MOVIES`:
      return Object.assign({}, state, {
        bookmarks: action.payload
      });
    case `CHECKAUTORIEZED`:
      return Object.assign({}, state, {
        isAutorized: action.payload,
      });
    case `AUTHORIZED`:
      return Object.assign({}, state, {
        user: action.payload,
      });
    case `RESET_NUMBER_OF_SHOW_CARD`:
      return Object.assign({}, state, {
        showcard: action.payload,
      });
    default:
      return state;
  }
};

export {reducer, ActionCreator, Operation};
