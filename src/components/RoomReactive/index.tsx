import {
  PiVideoCameraFill,
  PiVideoCameraSlashFill,
  PiMicrophoneFill,
  PiMicrophoneSlashFill,
  PiLinkSimpleHorizontalBold,
} from "react-icons/pi";
import { IoIosExit } from "react-icons/io";

import { Chat } from "./Chat";

import { useReducer } from "react";
import "./styles.scss";
import ButtonControl from "./Chat/components/ButtonControl/ButtonControl";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

type ControlsState = {
  camera: boolean;
  microphone: boolean;
};

type ControlsAction = {
  type: string;
  payload: boolean;
};

const iconConfig = {
  size: "2em",
  color: "#FFF",
};

const controlsReducer = (state: ControlsState, action: ControlsAction) => {
  switch (action.type) {
    case "TOGGLE_CAMERA":
      return {
        ...state,
        camera: action.payload,
      };
    case "TOGGLE_MICROPHONE":
      return {
        ...state,
        microphone: action.payload,
      };
    default:
      return state;
  }
};

export const RoomReactive = () => {
  const initialState: ControlsState = {
    camera: true,
    microphone: true,
  };

  const [{ camera, microphone }, dispatch] = useReducer(
    controlsReducer,
    initialState,
  );

  const copyRoomLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        showSuccessToast(
          "Link da sala copiado para a área de transferência!",
          "copy-success",
        );
      })
      .catch((err) => {
        showErrorToast("Erro ao copiar o link. Tente novamente.", "copy-error");
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <section className="room-grid">
      <article className="video-grid">
        <div className="participant shelter"></div>
        <div className="participant shelter"></div>
      </article>
      <div className="time-countdown shelter">
        <span className="time-left">Tempo limite: 10:00</span>
      </div>
      <div className="room-controls shelter">
        <Chat />
        <div className="controls">
          <ButtonControl
            className="camera"
            onClick={() => {
              dispatch({ type: "TOGGLE_CAMERA", payload: !camera });
            }}
          >
            {camera ? (
              <PiVideoCameraFill {...iconConfig} />
            ) : (
              <PiVideoCameraSlashFill {...iconConfig} />
            )}
          </ButtonControl>
          <ButtonControl
            className="microphone"
            onClick={() => {
              dispatch({ type: "TOGGLE_MICROPHONE", payload: !microphone });
            }}
          >
            {microphone ? (
              <PiMicrophoneFill {...iconConfig} />
            ) : (
              <PiMicrophoneSlashFill {...iconConfig} />
            )}
          </ButtonControl>
          <ButtonControl className="copy" onClick={copyRoomLink}>
            <PiLinkSimpleHorizontalBold {...iconConfig} />
          </ButtonControl>
          <ButtonControl className="exit">
            <IoIosExit {...iconConfig} />
          </ButtonControl>
        </div>
      </div>
    </section>
  );
};
