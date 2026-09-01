import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import MainRoute from './Components/PI Components/Main-Route/MainRoute';
import * as actions from './redux/actions/actions';
import { synchronizeAuthenticatedUser } from './auth/synchronizeSession';

function App() {
  const dispatch = useDispatch();
  const { getAccessTokenSilently, isAuthenticated, isLoading, user } =
    useAuth0();
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (isLoading) return undefined;

    if (!isAuthenticated || !user?.email) {
      setSessionReady(true);
      return undefined;
    }

    setSessionReady(false);

    const synchronizeSession = async () => {
      try {
        await synchronizeAuthenticatedUser({
          dispatch,
          getAccessToken: getAccessTokenSilently,
          user,
          storage: localStorage,
          actions,
          isCancelled: () => cancelled,
        });
      } catch {
        if (!cancelled) {
          console.error('Unable to restore the authenticated session.');
        }
      } finally {
        if (!cancelled) setSessionReady(true);
      }
    };

    synchronizeSession();

    return () => {
      cancelled = true;
    };
  }, [
    dispatch,
    getAccessTokenSilently,
    isAuthenticated,
    isLoading,
    user,
  ]);

  if (isLoading || !sessionReady) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-700">
        Restoring session...
      </div>
    );
  }

  return (
    <div className="App">
      <MainRoute />
    </div>
  );
}

export default App;
