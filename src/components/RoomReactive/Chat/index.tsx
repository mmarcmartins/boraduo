import './styles.scss';

export const Chat = () => {
    return(
        <form className="chat">
            <div className="content">
                <div className="message send">
                    <span>Só um texto mockado para entender como esse text area é para funcionar skibidi dibi bódi bódi</span>
                </div>
                <div className="message received">
                    <span>skibid</span>
                </div>
                <div className="message send">
                    <span>Só um texto mockado para entender como esse text area é para funcionar skibidi dibi bódi bódi</span>
                </div>
                <div className="message send">
                    <span>Só um texto mockado para entender como esse text area é para funcionar skibidi dibi bódi bódi</span>
                </div>
                <div className="message send">
                    <span>Só um texto mockado para entender como esse text area é para funcionar skibidi dibi bódi bódi</span>
                </div>
                <div className="message send">
                    <span>Só um texto mockado para entender como esse text area é para funcionar skibidi dibi bódi bódi</span>
                </div>
                <div className="message send">
                    <span>Só um texto mockado para entender como esse text area é para funcionar skibidi dibi bódi bódi</span>
                </div>
            </div>
            <div className="input-area">
                <input type="text" className="custom-area" placeholder="Digite uma mensagem"/>
                <button type="submit" className="submit-chat"/>
            </div>
        </form>
    )
}