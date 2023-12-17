let currentUser;
const STORE_NAME = 'user';

let secondUser;
const STORE_NAME2 = 'user2';

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
};

const isAuthenticated = () => currentUser !== undefined;

const clearAuthenticatedUser = () => {

  localStorage.removeItem(STORE_NAME);
  currentUser = undefined;
};

const getAuthenticatedUser2 = () => {
  if (secondUser !== undefined) return secondUser;

  const serializedUser = localStorage.getItem(STORE_NAME2);

  if (!serializedUser) return undefined;

  secondUser = JSON.parse(serializedUser);

  return secondUser;
};


const setAuthenticatedUser2 = (authenticatedUser) => {
  const serializedUser = JSON.stringify(authenticatedUser);

  localStorage.setItem(STORE_NAME2, serializedUser);

  secondUser = authenticatedUser;
};

const isAuthenticated2 = () => secondUser !== undefined;

const clearAuthenticatedUser2 = () => {

  localStorage.removeItem(STORE_NAME2);
  secondUser = undefined;
};

// eslint-disable-next-line object-curly-newline
export { getAuthenticatedUser, setAuthenticatedUser, isAuthenticated, clearAuthenticatedUser, getAuthenticatedUser2, setAuthenticatedUser2, isAuthenticated2, clearAuthenticatedUser2 };