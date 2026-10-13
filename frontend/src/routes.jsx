import ProtectedRoute from "../components/protectedRoute";
import Conversations from "./pages/Home/HomePage";
import Login from "./pages/Login/login";
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
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
];

export default routes;