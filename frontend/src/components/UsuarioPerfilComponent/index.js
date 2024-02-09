import perfil from "./img/perfil2.png";
import styles from "./styles.module.scss";

export default function UsuarioPerfilComponent() {
  return (
    <>
    <div className={styles.func}>
      <div className={styles.center}>
        <img
          src={perfil}
          width="100"
          height="100"
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
      <hr/>
      <div className={styles.botoes}>
      <p>Tweets</p>
      {/* <div class={styles.verticalline}></div> */}
      <p>Respostas</p>
      {/* <div class={styles.verticalline}></div> */}
      <p>Like</p>
      </div>
      <hr/>
    </>
  );
}
