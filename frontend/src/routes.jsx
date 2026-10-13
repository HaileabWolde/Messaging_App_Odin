import {Navigate } from 'react-router-dom'
import ProtectedRoute from "../components/protectedRoute"
import Home from './pages/Home/HomePage';
import Login from './pages/Login/login';
import ErrorPage from './pages/errorPage';

const routes = [
  {
   path: "/", 
   element: <ProtectedRoute>
    < Home/>, 
   </ProtectedRoute>,
     
    errorElement: <ErrorPage />,
  },
  
  {
    path: "/login",
    element: <Login/>,
    errorElement: <ErrorPage/>
  },
  
];

export default routes;