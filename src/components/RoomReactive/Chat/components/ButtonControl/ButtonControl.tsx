import React from 'react';
import './styles.scss';

interface ButtonControlProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonControl: React.FC<ButtonControlProps> = ({children, className, ...otherProps}) => {    
    return (
        <button className={`button-control ${className}`} {...otherProps}>
            {children}
        </button>
    );
};
export default ButtonControl;
