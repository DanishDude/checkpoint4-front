export const StartFetchShows = () => ({
  type: 'START_FETCH_SHOWS',
});
export const FetchSuccessShows = shows => ({
  type: 'FETCH_SUCCESS_SHOWS',
  shows,
});
export const FetchErrorShows = err => ({
  type: 'FETCH_ERROR_SHOWS',
  err,
});

export const asyncFetchShows = () => (dispatch) => {
  (StartFetchShows());
  fetch('http://localhost:5000/api/circus-show-full')
    .then(res => res.json())
    .then((shows) => {
      dispatch(FetchSuccessShows(shows));
    })
    .catch(() => {
      dispatch(FetchErrorShows('Aw Snap :-/ There was an error loading the shows'));
    });
};