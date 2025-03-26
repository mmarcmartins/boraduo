import React from "react";
import "./styles.scss";
import { ClickSpark } from "../../../../ClickSpark";

interface ButtonControlProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonControl: React.FC<ButtonControlProps> = ({
  children,
  className,
  ...otherProps
}) => {
  return (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <button className={`button-control ${className}`} {...otherProps}>
        {children}
      </button>
    </ClickSpark>
  );
};
export default ButtonControl;
