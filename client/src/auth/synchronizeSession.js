const successfulActionTypes = {
  createUser: 'CREATE_USER',
  userSpecific: 'USER_SPECIFIC',
};

const defaultWait = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export async function synchronizeAuthenticatedUser({
  dispatch,
  getAccessToken,
  user,
  storage,
  actions,
  attempts = 20,
  retryDelay = 500,
  wait = defaultWait,
  isCancelled = () => false,
}) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    if (isCancelled()) return false;

    try {
      const token = await getAccessToken();
      if (isCancelled()) return false;

      const created = await dispatch(
        actions.createUser(
          { email: user.email, img: user.picture, name: user.name },
          token
        )
      );
      if (created?.type !== successfulActionTypes.createUser) {
        throw new Error('The API could not synchronize the authenticated user.');
      }

      const loaded = await dispatch(actions.userSpecific(user.email, token));
      if (loaded?.type !== successfulActionTypes.userSpecific) {
        throw new Error('The API could not load the authenticated user.');
      }

      // A 403 is a valid result for a regular user. The action stores false.
      await dispatch(actions.userAdmin(user.email, token));

      storage.setItem('email', JSON.stringify(user.email));
      storage.setItem('token', JSON.stringify(token));
      return true;
    } catch (error) {
      lastError = error;
      if (attempt < attempts && !isCancelled()) await wait(retryDelay);
    }
  }

  throw lastError;
}
