import perfil from "./img/perfil2.png";
import styles from "./styles.module.scss";

export default function UsuarioPerfilComponent({setCards}) {
  const handleSweetsClick = () => {
    console.log("Sweets clicado!");
    setCards(0);
  };

  const handleRespostasClick = () => {
    console.log("Respostas clicado!");
    setCards(1);
  };

  const handleLikesClick = () => {
    console.log("Likes clicado!");
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
          <p className={styles.bio}>Fulano de Tal</p>
          <p className={styles.name}>@Fulano</p>
          <p>Bio Bio Bio Bio Bio Bio Bio Bio</p>
          <p>09/02/2024</p>
        </div>
      </div>
      {/* <hr className={styles.hr}/> */}
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
