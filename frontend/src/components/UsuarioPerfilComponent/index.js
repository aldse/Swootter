import { useParams } from "react-router-dom";
import perfil from "./img/perfil2.png";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UsuarioPerfilComponent({ setCards }) {
  const [user, setUser] = useState({})
  let { userid } = useParams();

  async function getUser() {
    try {
      const response = await axios.get('http://localhost:8080/user/get/' + userid);
      return response.data.user;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return {};
    }
  }

  useEffect(() => {
    async function fetchData() {
      const userdata = await getUser();
      setUser(userdata);
    }

    fetchData();
  }, [userid]);

  const handleSweetsClick = () => {
    setCards(0);
  };

  const handleRespostasClick = () => {
    setCards(1);
  };

  const handleLikesClick = () => {
    setCards(2);
  };

  return (
    <>
      <div className={styles.func}>
        <div className={styles.center}>
          <img
            src={perfil}
            width="120"
            height="120"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </div>
        <div className={styles.funca}>
          <p className={styles.bio}>{user?.name}</p>
          <p className={styles.name}>@{user?.username}</p>
          <p>{new Date(user?.birthdate).toUTCString().slice(5, 16)}</p>
        </div>
      </div>
      <div className={styles.botoes}>
        <p className={styles.p} onClick={handleSweetsClick}>
          Sweets
        </p>
        <div className={styles.verticalline}></div>
        <p className={styles.p} onClick={handleRespostasClick}>
          Respostas
        </p>
        <div className={styles.verticalline}></div>
        <p className={styles.p} onClick={handleLikesClick}>
          Likes
        </p>
      </div>
      {/* <hr className={styles.hr}/> */}
    </>
  );
}
