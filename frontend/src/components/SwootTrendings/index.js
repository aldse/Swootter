import React, { useContext, useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import styles from "./styles.module.scss";
import { AlertaContext } from "../../context/alerta/index";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import perfil from "../NavBarDentro/img/perfil5.png";
import { BiLike, BiSolidLike, BiCommentDetail } from "react-icons/bi";
import { jwtDecode } from "jwt-decode";

export default function SwootFeed() {
  const { setMessage, setShow, setVariant } = useContext(AlertaContext);
  const [swootData, setSwootData] = useState([]);

  function ShowLike(likes) {
    var token = sessionStorage.getItem('token');
    const jwt = jwtDecode(token);
    
    const searchIndex = likes.likes.findIndex(user => user._id == jwt.userid);
    if (searchIndex != -1)
      return <BiSolidLike className={styles.interactionButtons} style={{ color: '#f31c68' }} />
    
    return <BiLike className={styles.interactionButtons} style={{ color: '#f31c68' }} />
  }

  async function likeSwoot(swootid) {
    try {
      var token = sessionStorage.getItem('token');
      const res = await axios.post("http://localhost:8080/likes", {
        token,
        swootid
      });
      setSwoots();
      return res.message;
    } catch (error) {
      setMessage(error);
      setShow(true);
      setVariant("danger");
    }
  }

  async function getSwoots() {
    try {
      const res = await axios.get("http://localhost:8080/swoot/get-all");
      setSwootData(res.data.swoots)
      return res.data.swoots;
    } catch (error) {
      setMessage(error);
      setShow(true);
      setVariant("danger");
    }
  }

  async function setSwoots() {
    const swoots = await getSwoots();
    var sortedData = swoots.sort((a, b) => b.likes.length - a.likes.length)
    setSwootData(sortedData);
  }

  useEffect(() => {
    setSwoots();
  }, [])

  return (
    <>
      {swootData?.slice(0).map((swoot) => (
        <Container className={styles.Container} key={swoot._id}>
          <Row className={styles.row}>
            <Col xs={4} md={3} className={styles.imagem}>
              <Image className={styles.img} src={perfil} roundedCircle />
              <Col className={styles.date}>
                <div>
                  <p className={styles.name}>{swoot.user.name}</p>
                  <p className={styles.hide}>@{swoot.user.username}</p>
                </div>
                <p className={styles.hide}>{(new Date(swoot.createdAt)).toUTCString().slice(5, 16)}</p>
              </Col>
            </Col>
            <Col className={styles.texto}>
              <p>{swoot.text}</p>
            </Col>
            <Card.Footer className={styles.footer}>
              <Button variant="link" style={{ textDecoration: "none" }} onClick={() => likeSwoot(swoot._id)}>
                <div style={{ display: "flex" }}>
                  <ShowLike likes={swoot.likes}/>
                  <div className={styles.hide} style={{ margin: "0 0 0 10px" }}>{swoot.likes?.length}</div>
                </div>
              </Button>
              <Button variant="link" style={{ textDecoration: "none" }}>
                <div style={{ display: "flex" }}>
                  <BiCommentDetail className={styles.interactionButtons} style={{ color: '#f31c68' }} />
                  <div className={styles.hide} style={{ margin: "0 0 0 10px" }}>0{ }</div>
                </div>
              </Button>
            </Card.Footer>
          </Row>
        </Container>
      ))}
    </>
  );
}
