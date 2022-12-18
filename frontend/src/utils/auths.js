const STORE_NAME = 'user';
let currentUser = JSON.parse(localStorage.getItem(STORE_NAME)) ?? undefined;

const getAuthenticatedUser = () => {
  if (currentUser !== undefined) return currentUser;

  const serializedUser = localStorage.getItem(STORE_NAME);
  if (!serializedUser) return undefined;

  currentUser = JSON.parse(serializedUser);
  return currentUser;
};

const setAuthenticatedUser = (authenticatedUser) => {
  const serializedUser = JSON.stringify(authenticatedUser);
  localStorage.setItem(STORE_NAME, serializedUser);

  currentUser = authenticatedUser;
  console.log(currentUser);
};

const isAuthenticated = () => {
  console.log("IM HERE");
  console.log(currentUser);
  return currentUser !== undefined;
}

const clearAuthenticatedUser = () => {
  localStorage.removeItem(STORE_NAME);
  currentUser = undefined;
};

// eslint-disable-next-line object-curly-newline
export { getAuthenticatedUser, setAuthenticatedUser, isAuthenticated, clearAuthenticatedUser };
