import { ActionButton } from "../ActionButton";

type FooterProps = {
  isJoinRoom: boolean;
  disabled: boolean;
};

export const Footer = ({ isJoinRoom, disabled }: FooterProps) => {
  return (
    <div className="footer">
      <ActionButton
        disabled={isJoinRoom || disabled}
        onClick={() => console.log("test")}
      >
        <span>Criar sala</span>
        </ActionButton>
      <ActionButton
        disabled={!isJoinRoom || disabled}        
        onClick={() => console.log("test")}
      >
        <span>Entrar na sala</span>
      </ActionButton>
    </div>
  );
};
