import logo from "./img/loguinhologo.png";
import home from "./img/casinha.png";
import chama from "./img/hot2.png";
import perfil from "./img/perfil5.png";
import add from "./img/btn1.png";
import sair from "./img/sair.png";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { LogoContainer, NavLinkContainer } from "./styled";
import React from "react";
import ModalAddSweet from "../ModalAddSweet/index";
import { Image, NavLink } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { jwtDecode }from 'jwt-decode';

function NavBarDentro() {
  const [modalShow, setModalShow] = React.useState(false);
  const userid = jwtDecode(sessionStorage.getItem('token'));
  const navigate = useNavigate();

  function logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
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
              <Offcanvas.Body
                className="d-flex flex-column align-items-center"
                style={{ width: "90%" }}
              >
                <NavLinkContainer>
                  <Link
                    to={`perfil/${userid}`}
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

                </NavLinkContainer>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
                  <Image
                    src={sair}
                    width="80"
                    height="80"
                    className="d-inline-block align-top"
                    alt="Logo"
                    onClick={logout}
                  />
        </Navbar>
      ))}
      <Outlet/>
    </>
  );
}

export default NavBarDentro;
