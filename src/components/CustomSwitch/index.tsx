
import './styles.scss';

type CustomSwitchProps = {
    onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
    checked: boolean;
}

export const CustomSwitch = ({onClick, checked}:CustomSwitchProps) => {
    return (
        <div className="custom-switch">
            <label className="switch">
            <input checked={checked} type="checkbox" onClick={onClick}/>
            <span className="slider round"></span>
            </label>
        </div> 
    )
}