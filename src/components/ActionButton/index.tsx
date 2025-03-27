import { ClickSpark } from "../ClickSpark";
import "./styles.scss";
import type { ButtonHTMLAttributes } from "react";

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  React.PropsWithChildren;

export const ActionButton = ({
  className = "",
  children,
  ...buttonProps
}: ActionButtonProps) => {
  return (
    <button className={`action-button ${className}`} {...buttonProps}>
      <ClickSpark
        sparkColor="#fff"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        {children}
      </ClickSpark>
    </button>
  );
};
