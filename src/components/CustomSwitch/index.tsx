
import './styles.scss';

type CustomSwitchProps = {
    onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
}

export const CustomSwitch = ({onClick}:CustomSwitchProps) => {
    return (
        <div className="custom-switch">
            <label className="switch">
            <input type="checkbox" onClick={onClick}/>
            <span className="slider round"></span>
            </label>
        </div> 
    )
}