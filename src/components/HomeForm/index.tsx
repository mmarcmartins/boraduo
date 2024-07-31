import { CustomSwitch } from "../CustomSwitch";
import { Footer } from "./Footer";
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"

import './styles.scss';
import { SelectAutoComplete } from "../SelectAutoComplete";

const homeFormSchema = (gameOptions: string[]) => z.object({
            name: z.string().min(1, "Nome é obrigatório"),
            game: z.string().refine((val) => gameOptions.includes(val)),
            roomCode: z.string().optional(),
            JoinRoom: z.boolean().default(true)
        }).refine(({JoinRoom,roomCode}) => {
            if(JoinRoom && !roomCode) return false
        }, {
            message: "Código da sala é obrigatório"})
            
type homeFormData = z.infer< ReturnType<typeof homeFormSchema>>

export const HomeForm = () => {

    const { 
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
      } = useForm<homeFormData>({
        resolver: zodResolver(homeFormSchema(["League of legends"]))
      })    

    const handleSwitchClick = (event: React.MouseEvent<HTMLInputElement>) => {        
        setValue("JoinRoom",event.target.checked);
    }

    const watchJoinRoom = watch("JoinRoom", false);
    
    const disabledClass = !watchJoinRoom ? 'disabled' : '';

    const onSubmit = (data: homeFormData) => {
        console.log(data);
    }

    return(
        <form className="home-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="content">
            <div className="input-holder">
                <label htmlFor="name">Nome:</label>
                <input type="text" {...register("name")} />
                {errors.name && <span>{errors.name.message}</span>}
            </div>
            <div className="input-holder">
                <label htmlFor="game">Quero um duo para:</label>                
                    <SelectAutoComplete 
                        items={[
                            "League of legends",
                            "Call of duty"
                        ]} 
                        onSelectItem={(newValue) => setValue("game", newValue) }
                    />                
                {errors.game && <span>{errors.game.message}</span>}
            </div>   
            
            <div className={`input-holder ${disabledClass}`}>
                <label htmlFor="roomCode">Código da sala</label>
                <input type="text" disabled={!!disabledClass} {...register("roomCode")} />
                {errors.roomCode && <span>{errors.roomCode.message}</span>}
            </div>   
            
            <div className="switch-description">
                <CustomSwitch checked={watchJoinRoom} onClick={handleSwitchClick}/>
                <span>Criar sala / entrar na sala</span>
            </div>
            </div>
            <Footer isJoinRoom={watchJoinRoom}/>   
            </form>            
    )
}