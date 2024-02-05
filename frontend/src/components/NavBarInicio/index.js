import logo from "./img/loguinhologo.png";
import home from "./img/casinha.png";
import chama from "./img/hot2.png";
import perfil from "./img/perfil2.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLinkContainer } from "./styled"; // Importe os estilos
import "./style.css";
import { Link } from "react-router-dom";
import styles from './styles.module.scss';


function NavBarInicio() {
  return (
    <>
      {["md"].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-color mb-3">
          {" "}
          <Container fluid>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Body
                className="d-flex flex-column align-items-center"
                style={{ width: "115%" }}
              >
                <NavLinkContainer>
                  <Nav.Link to="/login" style={{ color: "white" }}>
                    <img
                      src={logo}
                      width="auto"
                      height="80"
                      className="d-inline-block align-top"
                      alt="Logo"
                    />
                  </Nav.Link>
                </NavLinkContainer>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
            <button className="nav-buttons" type="button">
              <Link to="/login" className="buttons-text">Login</Link>
            </button>
            <button className="nav-buttons" type="button">
              <Link to="/registro" className="buttons-text">Registro</Link>
            </button>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavBarInicio;
