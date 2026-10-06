//import App from "./App.jsx";
import Home from './pages/HomePage';
import Login from './pages/login';
import ErrorPage from './pages/errorPage';

const routes = [
  {
   path: "/", 
   element: <Home/>,   
    errorElement: <ErrorPage />,
  },
  
  {
    path: "/login",
    element: <Login/>,
    errorElement: <ErrorPage/>
  },
  
];

export default routes;