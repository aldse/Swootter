import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import styles from "./styles.module.scss";

export default function TrendsComponent({ setCards }) {
  return (
    <>
      <div className={styles.center}>
        <Card className={styles.card}  style={{ width: "18rem" }}>
          <ListGroup variant="flush">
            <ListGroup.Item className={styles.card}>Cras justo odio</ListGroup.Item>
            <ListGroup.Item className={styles.card}>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item className={styles.card}>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    </>
  );
}
