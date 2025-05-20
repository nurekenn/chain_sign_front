import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './pages/homepage/homepage';
import ChooseSigner from './pages/chooseSigner/chooseSigner';
import Wallet from './pages/wallet/wallet';
import SignIn from './pages/signIn/signIn';
import AdminPanel from './pages/admin/admin';

const routes = createBrowserRouter([
  {
    path: '/',
    children: [
      { path: '/', element: <SignIn /> },
      { path: '/wallet', element: <Wallet /> },
      { path: '/home', element: <Homepage /> },
      { path: '/chooseSigner', element: <ChooseSigner /> },
      { path: '/admin', element: <AdminPanel /> },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={routes} />
  );
}

export default App;