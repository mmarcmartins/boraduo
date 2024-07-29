import { ActionButton } from "../ActionButton"

type FooterProps = {
    isCreateRoom: boolean;
};

export const Footer = ({isCreateRoom}: FooterProps) => {
    return (
        <div className="footer">                            
            <ActionButton disabled={isCreateRoom} title='Criar sala' onClick={() => console.log('test')}/>
            <ActionButton disabled={!isCreateRoom} title='Entrar na sala' onClick={() => console.log('test')}/>
        </div>     
    )
}