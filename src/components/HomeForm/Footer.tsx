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
        title="Criar sala"
        onClick={() => console.log("test")}
      />
      <ActionButton
        disabled={!isJoinRoom || disabled}
        title="Entrar na sala"
        onClick={() => console.log("test")}
      />
    </div>
  );
};
