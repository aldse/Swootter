import { Col, Row } from "react-bootstrap";
import styles from "./styles.module.scss";
import UsuarioPerfilComponent from "../../components/UsuarioPerfilComponent";
import AlertaComponent from "../../components/AlertaComponent";
import NavBarDentro from "../../components/NavBarDentro";

export default function UsuarioPerfil(){
    return(
        <>
        <NavBarDentro />
        <Col className={styles.container}>
            <Row className={styles.center}>
                <Col xs={12} sm={8} md={6}>
                    <AlertaComponent />
                    <UsuarioPerfilComponent />
                </Col>
            </Row>
        </Col>
        </>
    )
}
