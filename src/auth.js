const fakeAuthProvider = {
  isAuthenticated: false,
  signIn(callBack) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callBack, 100);
  },

  signOut(callBack) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callBack, 100);
  },
};

export { fakeAuthProvider };
