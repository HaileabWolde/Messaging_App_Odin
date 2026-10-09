//import App from "./App.jsx";
import Home from './pages/Home/HomePage';
import Login from './pages/Login/login';
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