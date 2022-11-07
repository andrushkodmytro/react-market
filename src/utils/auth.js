import store from 'store2';

class Auth {
  isAuthenticated = () => {
    const session = store.get('auth');
    return !!session && new Date().getTime() < session.user.expiry;
  };

  removeSession = () => {
    store.remove('auth');
  };

  // getUserSession = () => {
  //   const session = store.get('auth');

  //   if (!!session) {
  //     if (new Date().getTime() < session.headers.expiry * 1000) {
  //       return session;
  //     }

  //     this.removeSession();
  //     return null;
  //   } else {
  //     return null;
  //   }
  // };

  // setSession = (authResult: any) => {
  //   store.set('auth', authResult);
  // };

  // setUser = (data: any) => {
  //   let session = store.get('auth');
  //   session.user = { ...data };
  //   this.setSession(session);
  // };

  getUser = () => {
    const session = store.get('auth');
    const user = session && session.user;
    return user || {};
  };

  // setHeaders = (headers: any) => {
  //   const session = store.get('auth') || {};
  //   session.headers = { ...headers };
  //   this.setSession(session);
  // };

  // setTemporarySession = (authResult: any) => {
  //   store.set('temporarySession', authResult);
  // };

  // removeTemporarySession = () => {
  //   store.remove('temporarySession');
  // };
}

export default new Auth();
