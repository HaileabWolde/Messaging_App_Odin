import ProtectedRoute from "../components/protectedRoute";
import Conversations from "./pages/Home/HomePage";
import Login from "./pages/Login/login";
import Friends from "./pages/friends/FriendsPage";
import ErrorPage from "./pages/errorPage";

const routes = [
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
];

export default routes;