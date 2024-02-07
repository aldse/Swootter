import { useContext, useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import styles from "./styles.module.scss";
import { AlertaContext } from "../../context/alerta/index";
import CryptoJS from "crypto-js";
import { SECRET } from "../../env";
import NavBarDentro from "../../components/NavBarDentro";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import perfil from "../NavBarDentro/img/perfil5.png";

export default function SwootFeed() {
  const { setMessage, setShow, setVariant } = useContext(AlertaContext);
  var [swootData, setSwootData] = useState([]);

  async function getSwoots() {
    try {
      const res = await axios.get("http://localhost:8080/swoot/get-all");
      return res.data.swoots;
    } catch (error) {
      setMessage(error);
      setShow(true);
      setVariant("danger");
    }
  }

  async function setSwoots() {
    const res = await getSwoots();
    setSwootData(res);
  }

  useEffect(() => {
    setSwoots();
    console.log(swootData);
  }, [])

  return (
    <>
      {swootData.map((swoot) => {
        <Container className={styles.Container}>
          <Row className={styles.row}>
            <Col xs={4} md={3} className={styles.imagem}>
              <Image className={styles.img} src={perfil} roundedCircle />
              <Col className={styles.date}>
                <p>Fulano de Tal</p>
                <p>32 Fev</p>
              </Col>
            </Col>
            <Col className={styles.texto}>
                <>
                  <p>{swoot.user.username}</p>
                  <p>{swoot.text}</p>
                </>
            </Col>
            <Card.Footer className={styles.footer}>
              <Button className={styles.footer} variant="link">
                Curtida
              </Button>
              <Button className={styles.footer} variant="link">
                Comentário
              </Button>
            </Card.Footer>
          </Row>
        </Container>
      })}
    </>
  );
}
