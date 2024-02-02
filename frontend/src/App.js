import "./App.css";
import NavBarInicio from "./components/NavBarInicio";
import NavBarDentro from "./components/NavBarDentro";
import { Route, Routes } from "react-router-dom";
import Registro from "./pages/registro";
import Login from "./pages/login";
import { AlertaProvider } from './context/alerta';

function App() {
  return (
    <>
    <AlertaProvider>
      <NavBarInicio/>
      <Routes>
        <Route path='/registro' element={<Registro />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/' element={<Home />} /> */}
      </Routes>
    </AlertaProvider>
    </>
  );
}
export default App;
