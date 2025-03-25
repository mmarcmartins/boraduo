import { MdSend } from "react-icons/md";

import "./styles.scss";

export const Chat = () => {
  return (
    <form className="chat">
      <div className="content">
        <div className="message send">
          <span>
            E aí, você já jogou o último jogo da série "The Elder Scrolls"?
          </span>
        </div>
        <div className="message received">
          <span>Ainda não, mas ouvi falar muito bem! O que você achou?</span>
        </div>
        <div className="message send">
          <span>
            Eu adorei! O mundo aberto é enorme e super imersivo. As quests são
            bem profundas também.
          </span>
        </div>
        <div className="message received">
          <span>
            Parece incrível! E a jogabilidade? Melhorou em relação ao anterior?
          </span>
        </div>
        <div className="message send">
          <span>
            Sim, a jogabilidade está mais fluida. Agora tem mais opções de
            customização dos personagens também, o que deixa tudo mais
            interessante.
          </span>
        </div>
        <div className="message received">
          <span>
            Isso é ótimo! Eu sou fã de personalizar meu personagem ao máximo. E
            como está a história?
          </span>
        </div>
        <div className="message send">
          <span>
            A história é épica, como de costume. Eu fiquei totalmente envolvido,
            principalmente pelas escolhas que o jogo permite fazer ao longo da
            narrativa.
          </span>
        </div>
        <div className="message received">
          <span>
            Isso é o que eu mais gosto nos RPGs. A sensação de que suas escolhas
            realmente importam. Vou jogar assim que puder!
          </span>
        </div>
        <div className="message send">
          <span>
            Com certeza, você vai adorar. Ah, e se você gosta de exploração, tem
            um monte de segredos espalhados pelo mapa!
          </span>
        </div>
        <div className="message received">
          <span>
            Boa, sou dessas que adora explorar tudo! Vou me perder nesse jogo
            haha
          </span>
        </div>
      </div>
      <div className="input-area">
        <input
          type="text"
          className="custom-area"
          placeholder="Digite uma mensagem"
        />
        <button type="submit" className="submit-chat">
          <MdSend color="#FFF" size="1.8em" />
        </button>
      </div>
    </form>
  );
};
