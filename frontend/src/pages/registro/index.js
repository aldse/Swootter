import { Col, Row } from "react-bootstrap";
import styles from "./styles.module.scss";
import RegistroComponent from "../../components/RegistroComponent";
import AlertaComponent from "../../components/AlertaComponent";
import NavBarInicio from "../../components/NavBarInicio";

export default function Registro() {
  return (
    <>
      <NavBarInicio />
      <Col className={styles.container}>
        <Row className={styles.center}>
          <Col xs={12} sm={8} md={4}>
            <AlertaComponent />
            <RegistroComponent />
          </Col>
        </Row>
      </Col>
    </>
  );
}
