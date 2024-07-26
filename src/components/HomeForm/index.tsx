import { useState } from "react";
import { ActionButton } from "../ActionButton"
import { CustomSwitch } from "../CustomSwitch";
import './styles.scss';

export const HomeForm = () => {
    const [createRoom, setCreateRoom] = useState(false);

    const handleSwitchClick = (event: React.MouseEvent<HTMLInputElement>) => {        
        setCreateRoom(event.target.checked);
    }

    return(
        <>
            <CustomSwitch onClick={handleSwitchClick}/>
            <div className="footer">                            
                <ActionButton disabled={createRoom} title='Criar sala' onClick={() => console.log('test')}/>
                <ActionButton disabled={!createRoom} title='Entrar na sala' onClick={() => console.log('test')}/>
            </div>            
        </>
    )
}