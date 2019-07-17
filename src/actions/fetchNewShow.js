import newShow from "../reducers/newShow";

export const startFetchNewShow = (newShow) => ({
  type: 'START_FETCH_NEW_SHOW',
  newShow,
});

export const fetchSuccessNewShow = (newShow) => ({
  type: 'FETCH_SUCCESS_NEW_SHOW',
  newShow,
});

export const fetchErrorNewShow = err => ({
  type: 'FETCH_ERROR_NEW_SHOW',
  err,
});

export const asyncFetchNewShow = (
  date, location, capacity, price,
) => (dispatch) => {
  newShow = {
    date: date,
    location: location,
    capacity: capacity,
    price: price,
  }

  dispatch(startFetchNewShow(newShow));
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newShow),
  };

  fetch('http://localhost:5000/api/circus-show', config)
    .then((res) => {
      if (res.status === 200) {
        dispatch(fetchSuccessNewShow());
      }
    })
    .catch(() => {
      dispatch(fetchErrorNewShow('Sorry, this did not register. Please try again later'));
    })
    .then(() => { dispatch(asyncFetchNewShow()); });
  return newShow;
}