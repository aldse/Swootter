import "./App.css";
import NavBarInicio from "./components/NavBarInicio";
import NavBarDentro from "./components/NavBarDentro";
import { Route, Routes } from "react-router-dom";
import Registro from "./pages/registro";
import Login from "./pages/login";
import { AlertaProvider } from "./context/alerta";
import RotaProtegida from "./pages/RotaProtegida";
import AcessoRestrito from "./pages/AcessoRestrito";
import UsuarioFeed from "./pages/UsuarioFeed";

function App() {
  return (
    <>
      <AlertaProvider>
        <Routes>
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<UsuarioFeed />} />

          {/* <Route
            path="/feed" element={
              <RotaProtegida
                errorPage={<AcessoRestrito />}
                targetPage={<NavBarInicio />}
              />
            }
          >
            <Route path='' element={<UsuarioFeed />} />
            <Route path="add" element={<AddPostPage />} />
          </Route> */}
        </Routes>
      </AlertaProvider>
    </>
  );
}
export default App;
