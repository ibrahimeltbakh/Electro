import { ToastContainer } from "react-toastify";
import "./App.css";
import { ModeToggle } from "./components/theme/Mode-toggle";
import Routes from "./routes/Routes";
function App() {
  return (
    <>
       {/* <ModeToggle />
       <h1 className="text-primary text-3xl"> Electro</h1> */}
       <Routes/>
       <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
    </>
  );
}

export default App;
