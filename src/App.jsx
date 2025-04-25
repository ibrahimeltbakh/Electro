import { ToastContainer } from "react-toastify";
import Routes from "./routes/Routes";
function App() {
  return (
    <>
      <Routes />
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
