import { RouterProvider } from "react-router-dom"
import { router } from "./components/App/Router/AppRoutes";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}>

      </RouterProvider>
    </div>
  );
}

export default App;
