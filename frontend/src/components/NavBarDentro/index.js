import logo from "./img/loguinhologo.png";
import home from "./img/casinha.png";
import chama from "./img/hot2.png";
import perfil from "./img/perfil2.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Header, NavLink, LogoContainer, NavLinkContainer } from "./styled"; // Importe os estilos

function NavBarDentro() {
  return (
    <>
      {["md"].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-transparent mb-3">
          {" "}
          <Container fluid>
            <LogoContainer>
              <Navbar.Brand href="#home">
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
              <Offcanvas.Body className="d-flex flex-column align-items-center" style={{ width: "90%" }}> 
                <NavLinkContainer>
                  <Nav.Link to="/perfil" style={{ padding: "2%", color: "white" }}>
                  <img
                  src={perfil}
                  width="58"
                  height="57"
                  className="d-inline-block align-top"
                  alt="Logo"
                />
                  </Nav.Link>
                  <Nav.Link to="/" style={{ padding: "2%", color: "white" }}>
                  <img
                  src={home}
                  width="60"
                  height="60"
                  className="d-inline-block align-top"
                  alt="Logo"
                />
                  </Nav.Link>
                  <Nav.Link to="/tops" style={{ padding: "2%", color: "white" }}>
                  <img
                  src={chama}
                  width="60"
                  height="60"
                  className="d-inline-block align-top"
                  alt="Logo"
                />
                  </Nav.Link>
                </NavLinkContainer>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavBarDentro;