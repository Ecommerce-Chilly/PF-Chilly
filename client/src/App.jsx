import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import MainRoute from './Components/PI Components/Main-Route/MainRoute';
import { createUser, userAdmin, userSpecific } from './redux/actions/actions';

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
        const token = await getAccessTokenSilently();

        if (cancelled) return;

        localStorage.setItem('email', JSON.stringify(user.email));
        localStorage.setItem('token', JSON.stringify(token));

        await dispatch(
          createUser(
            { email: user.email, img: user.picture, name: user.name },
            token
          )
        );
        await dispatch(userSpecific(user.email, token));
        await dispatch(userAdmin(user.email, token));
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
    user?.email,
    user?.name,
    user?.picture,
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
