import { ActionButton } from "../ActionButton"

type FooterProps = {
    isJoinRoom: boolean;
};

export const Footer = ({isJoinRoom}: FooterProps) => {
    return (
        <div className="footer">                            
            <ActionButton disabled={isJoinRoom} title='Criar sala' onClick={() => console.log('test')}/>
            <ActionButton disabled={!isJoinRoom} title='Entrar na sala' onClick={() => console.log('test')}/>
        </div>     
    )
}