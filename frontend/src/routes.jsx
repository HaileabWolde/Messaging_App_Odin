import { Navigate } from "react-router-dom";
import ProtectedRoute from "../components/protectedRoute";
import Conversations from "./pages/Home/HomePage";
import Login from "./pages/Login/login";
import Friends from "./pages/friends/FriendsPage";
import Messaging from "./pages/Message/Messaging";
import ErrorPage from "./pages/errorPage";

const routes = [
  {
    path: "/",
    element:   localStorage.getItem('token') ?  <Navigate to="/conversations" replace />: 
   <Navigate to="/login" replace />,
    errorElement: <ErrorPage />,
  },
  {

    path: "/conversations",
    element: (
      <ProtectedRoute>
        <Conversations />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/friends",
    element: (
      <ProtectedRoute>
        <Friends/>
      </ProtectedRoute>
    )
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/conversations/:id",
    element: <Messaging/>,
    errorElement: <ErrorPage/>
  }
];

export default routes;