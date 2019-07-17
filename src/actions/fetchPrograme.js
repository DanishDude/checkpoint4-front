export const StartFetchProgrames = () => ({
  type: 'START_FETCH_PROGRAMES',
});
export const FetchSuccessProgrames = programes => ({
  type: 'FETCH_SUCCESS_PROGRAMES',
  programes,
});
export const FetchErrorProgrames = err => ({
  type: 'FETCH_ERROR_PROGRAMES',
  err,
});

export const asyncFetchProgrames = () => (dispatch) => {
  (StartFetchProgrames());
  fetch('http://localhost:5000/api/programe')
    .then(res => res.json())
    .then((programes) => {
      dispatch(FetchSuccessProgrames(programes));
    })
    .catch(() => {
      dispatch(FetchErrorProgrames('Aw Snap :-/ There was an error loading the Programe'));
    });
};