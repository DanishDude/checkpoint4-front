import { urlApi } from '../constant';

export const StartFetchShows = () => ({
  type: 'START_FETCH_SHOWS',
});
export const FetchSuccessShows = show => ({
  type: 'FETCH_SUCCESS_SHOW',
  show,
});
export const FetchErrorShows = err => ({
  type: 'FETCH_ERROR_SHOW',
  err,
});

export const asyncFetchShows = () => (dispatch) => {
  console.log('toto');
  (StartFetchShows());
  fetch(`${urlApi}/circus-show`)
    .then(res => res.json())
    .then((show) => {
      dispatch(FetchSuccessShows(show));
    })
    .catch(() => {
      dispatch(FetchErrorShows('Aw Snap :-/ There was an error loading the shows'));
    });
};