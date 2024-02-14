import logo from "./img/loguinhologo.png";
import home from "./img/casinha.png";
import chama from "./img/hot2.png";
import perfil from "./img/perfil5.png";
import add from "./img/btn1.png";
import sair from "./img/sair.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Links, LogoContainer, Logout, NavLinkContainer, Void } from "./styled";
import React from "react";
import ModalAddSweet from "../ModalAddSweet/index";
import { Image } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";

function NavBarDentro() {
  const [modalShow, setModalShow] = React.useState(false);

  const navigate = useNavigate();

  function logout() {
    sessionStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      {["md"].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-color mb-3">
          {" "}
          <Container fluid>
            <LogoContainer>
              <Navbar.Brand href="/feed">
                <img
                  src={logo}
                  width="80"
                  height="60"
                  className="d-inline-block align-top"
                  alt="Logo"
                />
              </Navbar.Brand>
            </LogoContainer>

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <NavLinkContainer>
                <Void />
                <Links className="links">
                  <Link
                    to={`perfil/${sessionStorage.getItem("userId")}`}
                    style={{ padding: "2%", color: "white" }}
                  >
                    <img
                      src={perfil}
                      width="60"
                      height="60"
                      className="d-inline-block align-top"
                      alt="Logo"
                    />
                  </Link>
                  <Link to="/feed" style={{ padding: "2%", color: "white" }}>
                    <img
                      src={home}
                      width="60"
                      height="60"
                      className="d-inline-block align-top"
                      alt="Logo"
                    />
                  </Link>
                  <Link to="/tops" style={{ padding: "2%", color: "white" }}>
                    <img
                      src={chama}
                      width="60"
                      height="60"
                      className="d-inline-block align-top"
                      alt="Logo"
                    />
                  </Link>
                  <Link style={{ padding: "2%", color: "white" }}>
                    <img
                      src={add}
                      width="60"
                      height="60"
                      className="d-inline-block align-top"
                      alt="Logo"
                      onClick={() => setModalShow(true)}
                    />
                    <ModalAddSweet
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                  </Link>
                </Links>
                <Logout>
                  <Image
                    src={sair}
                    width="80"
                    height="80"
                    className="d-inline-block align-top"
                    alt="Logo"
                    onClick={logout}
                  />
                </Logout>
              </NavLinkContainer>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      <Outlet />
    </>
  );
}

export default NavBarDentro;
