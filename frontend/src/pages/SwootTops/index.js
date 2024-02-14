import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./styles.module.scss";
import SwootTrendings from "../../components/SwootTrendings";

export default function SwootTops() {
  return (
    <>
      <Col className={styles.container}>
        <Row className={styles.center}>
          <Col xs={12} sm={8} md={4}>
            <SwootTrendings/>
          </Col>
        </Row>
      </Col>
    </>
  );
}
