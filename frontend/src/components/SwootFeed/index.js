<<<<<<< HEAD
import React, { useContext, useState, useEffect, useRef } from "react";
import { Button, Card, Spinner } from "react-bootstrap"; // Importe o Spinner do react-bootstrap
=======
import React, { useContext, useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
>>>>>>> 02cf022ba506b83365344430cfa82cc0106a14d1
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
import { Link } from "react-router-dom"; // Importe o Link do react-router-dom

export default function SwootFeed() {
  const { setMessage, setShow, setVariant } = useContext(AlertaContext);
  const [swootData, setSwootData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const endOfPageRef = useRef();

<<<<<<< HEAD
  function ShowLike({ likes }) {
    var userid = jwtDecode(sessionStorage.getItem("token"));
    let curtido = false;

    if (likes && likes.likes) {
      likes.likes.map((like) => {
        if (like.user._id == userid.userid) curtido = true;
      });
    }

    if (curtido)
      return (
        <BiSolidLike
          className={styles.interactionButtons}
          style={{ color: "#f31c68" }}
        />
      );
    return (
      <BiLike
        className={styles.interactionButtons}
        style={{ color: "#f31c68" }}
      />
    );
=======
  function ShowLike(likes) {
    var token = sessionStorage.getItem('token');
    const jwt = jwtDecode(token);
    
    const searchIndex = likes.likes.findIndex(user => user._id == jwt.userid);
    if (searchIndex != -1)
      return <BiSolidLike className={styles.interactionButtons} style={{ color: '#f31c68' }} />
    
    return <BiLike className={styles.interactionButtons} style={{ color: '#f31c68' }} />
>>>>>>> 02cf022ba506b83365344430cfa82cc0106a14d1
  }

  async function likeSwoot(swootid) {
    try {
      var token = sessionStorage.getItem("token");
      const res = await axios.post("http://localhost:8080/likes", {
        token,
        swootid,
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
      setSwootData(res.data.swoots);
      return res.data.swoots;
    } catch (error) {
      setMessage(error);
      setShow(true);
      setVariant("danger");
    }
  }

<<<<<<< HEAD
  async function getLikes(swootid) {
    try {
      const res = await axios.get(
        "http://localhost:8080/likes/get-all/" + swootid
      );
      return res.data.likes;
    } catch (error) {
      setMessage(error);
      setShow(true);
      setVariant("danger");
    }
  }

  async function setSwoots() {
    const swoots = await getSwoots();
    const swootsWithLikes = await Promise.all(
      swoots.map(async (swoot) => {
        const likes = await getLikes(swoot._id);
        return { ...swoot, likes };
      })
    );
    setSwootData(swootsWithLikes);
=======
  async function setSwoots() {
    const swoots = await getSwoots();
    setSwootData(swoots);
>>>>>>> 02cf022ba506b83365344430cfa82cc0106a14d1
  }

  useEffect(() => {
    setSwoots();
  }, []);

  const loadMoreItems = () => {
    setLoading(true);
    setTimeout(() => {
      setItemsPerPage(itemsPerPage + 5);
      setLoading(false)    
    }, 4000);
  };

  useEffect(() => {
    if(itemsPerPage>= swootData.length) return
    loadMoreItems()
  }, [itemsPerPage])

  useEffect(() => {
    loadMoreItems();
  }, []);

  return (
<<<<<<< HEAD
    <div ref={endOfPageRef}>
      {swootData.slice(0, itemsPerPage).map((swoot) => (
=======
    <>
      {swootData?.slice(0).reverse().map((swoot) => (
>>>>>>> 02cf022ba506b83365344430cfa82cc0106a14d1
        <Container className={styles.Container} key={swoot._id}>
          <Row className={styles.row}>
            <Col xs={4} md={3} className={styles.imagem}>
              <Image className={styles.img} src={perfil} roundedCircle />
              <Col className={styles.date}>
                <div>
                  <p className={styles.name}>{swoot.user.name}</p>
                  <p className={styles.hide}>@{swoot.user.username}</p>
                </div>
                <p className={styles.hide}>
                  {new Date(swoot.createdAt).toUTCString().slice(5, 16)}
                </p>
              </Col>
            </Col>
            <Col className={styles.texto}>
              <p>{swoot.text}</p>
            </Col>
            <Card.Footer className={styles.footer}>
              <Button
                variant="link"
                style={{ textDecoration: "none" }}
                onClick={() => likeSwoot(swoot._id)}
              >
                <div style={{ display: "flex" }}>
<<<<<<< HEAD
                  <ShowLike likes={swoot} />
                  <div className={styles.hide} style={{ margin: "0 0 0 10px" }}>
                    {swoot.likes?.length}
                  </div>
=======
                  <ShowLike likes={swoot.likes}/>
                  <div className={styles.hide} style={{ margin: "0 0 0 10px" }}>{swoot.likes?.length}</div>
>>>>>>> 02cf022ba506b83365344430cfa82cc0106a14d1
                </div>
              </Button>
              {console.log(swoot)}
              <Link
                to={`/ClickSweet/${swoot._id}`} // Coloque o caminho da nova página aqui
                style={{ textDecoration: "none" }}
              >
                <div style={{ display: "flex" }}>
<<<<<<< HEAD
                  <BiCommentDetail
                    className={styles.interactionButtons}
                    style={{ color: "#f31c68" }}
                  />
                  <div className={styles.hide} style={{ margin: "0 0 0 10px" }}>
                    0{}
                  </div>
=======
                  <BiCommentDetail className={styles.interactionButtons} style={{ color: '#f31c68' }} />
                  <div className={styles.hide} style={{ margin: "0 0 0 10px" }}>0{ }</div>
>>>>>>> 02cf022ba506b83365344430cfa82cc0106a14d1
                </div>
              </Link>
            </Card.Footer>
          </Row>
        </Container>
      ))}
      {console.log(loading, swootData.length <= itemsPerPage)}
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {!loading && swootData.length <= itemsPerPage && <h1 className={styles.h1}>Você chegou ao fim dos Swoots</h1>}
    </div>
  );
}
