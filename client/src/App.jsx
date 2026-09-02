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
  const [sessionError, setSessionError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (isLoading) return undefined;

    if (!isAuthenticated || !user?.email) {
      setSessionReady(true);
      return undefined;
    }

    setSessionReady(false);
    setSessionError(false);

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
          setSessionError(true);
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

  if (sessionError) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 text-slate-700">
        <div className="max-w-lg rounded-lg border bg-white p-8 text-center shadow-lg">
          <h1 className="text-2xl font-semibold">Unable to restore your account</h1>
          <p className="mt-3">
            Authentication succeeded, but Chilly could not synchronize your
            user with the API. Check that the backend is running and try again.
          </p>
          <button
            type="button"
            className="mt-6 rounded bg-main px-5 py-2 font-semibold text-white"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="App">
      <MainRoute />
    </div>
  );
}

export default App;
