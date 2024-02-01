import logo from "./img/loguinhologo.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Header, NavLink, LogoContainer, NavLinkContainer } from "./styled"; // Importe os estilos

function NavBar() {
  return (
    <>
      {["md"].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-transparent mb-3">
          {" "}
          {/* Defina o background como transparente */}
          <Container fluid>
            <LogoContainer>
              <Navbar.Brand href="#home">
                <img
                  src={logo}
                  width="70"
                  height="50"
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
                  <Nav.Link to="/" style={{ padding: "2%", color: "white" }}>
                    Registro
                  </Nav.Link>
                  <Nav.Link to="/" style={{ padding: "2%", color: "white" }}>
                    Registro
                  </Nav.Link>
                  <Nav.Link to="/" style={{ padding: "2%", color: "white" }}>
                    Registro
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

export default NavBar;
