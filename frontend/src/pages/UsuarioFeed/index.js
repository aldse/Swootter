import NavBarDentro from "../../components/NavBarDentro";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./styles.module.scss";
import SwootFeed from "../../components/SwootFeed";

export default function UsuarioFeed() {
  return (
    <>
      <Col className={styles.container}>
        <Row className={styles.center}>
          <Col xs={12} sm={8} md={4}>
            <SwootFeed/>
          </Col>
        </Row>
      </Col>
    </>
  );
}
