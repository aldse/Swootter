import "./App.css";
import NavBarDentro from "./components/NavBarDentro";
import { Route, Routes } from "react-router-dom";
import Registro from "./pages/registro";
import Login from "./pages/login";
import { AlertaProvider } from "./context/alerta";
import RotaProtegida from "./pages/RotaProtegida";
import AcessoRestrito from "./pages/AcessoRestrito";
import UsuarioFeed from "./pages/UsuarioFeed";
import UsuarioPerfil from "./pages/usuarioperfil";
import SwootTops from "./pages/SwootTops";

function App() {
  return (
    <>
      <AlertaProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          {/* <Route path="/aaa" element={<UsuarioPerfil />} /> */}

          <Route path="/" element={<RotaProtegida errorPage={<AcessoRestrito />} targetPage={<NavBarDentro />} />}>
            <Route path="feed" element={<UsuarioFeed />} />
            <Route path="tops" element={<SwootTops/>} />
            <Route path="perfil/:idUsuario" element={<UsuarioPerfil />} />
            {/* <Route path="trends" element={<Trends />} /> */}
          </Route>
          {/* Rota para o perfil do usuário dentro do feed */}

          {/* <Route
            path="/feed" element={
              <RotaProtegida
                errorPage={<AcessoRestrito />}
                targetPage={<NavBarDentro />}
              />
            }
          >
            <Route path='' element={<UsuarioFeed />} /> */}
            {/* <Route path="add" element={<AddPostPage />} /> */}
          {/* </Route> */}
        </Routes>
      </AlertaProvider>
    </>
  );
}
export default App;
