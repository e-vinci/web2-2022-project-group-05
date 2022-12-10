// TODO tout ca vas a la poubelle car le user se trouve dans sessionStorage ou res.session
let currentUser;

const getAuthenticatedUser = () => currentUser;

const setAuthenticatedUser = (authenticatedUser) => {
  currentUser = authenticatedUser;
};

const isAuthenticated = () => currentUser !== undefined;

const clearAuthenticatedUser = () => {
  currentUser = undefined;
};

// eslint-disable-next-line object-curly-newline
export { getAuthenticatedUser, setAuthenticatedUser, isAuthenticated, clearAuthenticatedUser };
