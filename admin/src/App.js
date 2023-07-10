import { RouterProvider } from "react-router-dom"
import { router } from "./AppRoutes";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
