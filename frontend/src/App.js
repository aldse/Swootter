import "./App.css";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Registro from "./pages/registro";
import { AlertaProvider } from './context/alerta';

function App() {
  return (
    <>
    <AlertaProvider>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Registro />} />
      </Routes>
    </AlertaProvider>
    </>
  );
}
export default App;
