let currentUser;
let secondUser;

const getAuthenticatedUser = () => currentUser;

const getAuthenticatedUser2 = () => secondUser;

const setAuthenticatedUser = (authenticatedUser) => {
  currentUser = authenticatedUser;
};

const setAuthenticatedUser2 = (authenticatedUser2) =>{
  secondUser = authenticatedUser2;
}

const isAuthenticated = () => currentUser !== undefined;

const isAuthenticated2 = () => secondUser !== undefined;

const clearAuthenticatedUser = () => {
  currentUser = undefined;
};

const clearAuthenticatedUser2 = () => {
  secondUser = undefined;
}

// eslint-disable-next-line object-curly-newline
export { getAuthenticatedUser, setAuthenticatedUser, isAuthenticated, clearAuthenticatedUser, setAuthenticatedUser2, clearAuthenticatedUser2, getAuthenticatedUser2, isAuthenticated2 };
