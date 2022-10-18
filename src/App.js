import { ToastContainer, toast } from "react-toastify";
import Routing from "./routes/Routing";
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/Login";
import Register from "./components/Register/Register";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";


function App() {
  return (
    <div>
      <ToastContainer />
      <Routing />
      <Login/>
      <Register/>
      <ForgotPassword/>
    </div>
  );
}

export default App;
