import "./styles.scss";
import type { ButtonHTMLAttributes } from "react";

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & React.PropsWithChildren;

export const ActionButton = ({    
  className = "",
  children,
  ...buttonProps
}: ActionButtonProps) => {
  return (
    <button       
      className={`action-button ${className}`}
      {...buttonProps}
    >      
      {children}
    </button>
  );
};
