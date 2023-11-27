import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Jsx from '../pages/chapter2/JSX';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/jsx',
        element: <Jsx />,
      },
    ],
  },
]);

export default router;
