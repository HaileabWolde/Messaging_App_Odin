import { Navigate } from "react-router-dom";
import ProtectedRoute from "../components/protectedRoute";
import Conversations from "./pages/Home/HomePage";
import Login from "./pages/Login/login";
import Find_people from "./pages/Find_People/Find_People";
import Friend_Request from "./pages/Friend_Request/Friend_Request";
import Messaging from "./pages/Message/Messaging";
import Groups from "./pages/groups/Groups";
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
    path: "/find_people",
    element: (
      <ProtectedRoute>
        <Find_people />
      </ProtectedRoute>
    )
  },
  {
    path: "/friend_request",
    element: (
      <ProtectedRoute>
        <Friend_Request/>
      </ProtectedRoute>
    )
  },
  {
    path: "/groups",
    element: (
      <ProtectedRoute>
        <Groups/>
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