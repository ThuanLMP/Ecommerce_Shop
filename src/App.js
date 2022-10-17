import { ToastContainer, toast } from "react-toastify";
import Routing from "./routes/Routing";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div>
      <ToastContainer />
      <Routing />
    </div>
  );
}

export default App;
