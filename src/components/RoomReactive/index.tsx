import { Chat } from './Chat';
import './styles.scss';

export const RoomReactive = () => {
    return(
        <section className="room-grid">
            <div className="video-grid">
                <div className="participant shelter"></div>
                <div className="participant shelter"></div>
            </div>
            <div className="time-countdown shelter">
                <span className='time-left'>Tempo limite: 10:00</span>
            </div>
            <div className="room-controls shelter">
                <Chat/>
                <div className="controls"></div>
            </div>
        </section>
    )
}