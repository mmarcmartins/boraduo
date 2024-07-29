import { useState } from "react";
import { CustomSwitch } from "../CustomSwitch";
import { Footer } from "./Footer";
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"

import './styles.scss';

const homeFormSchema = (gameOptions: string[]) => z.object({
            name: z.string().min(1, "Nome é obrigatório"),
            game: z.string().refine((val) => gameOptions.includes(val)),
            roomCode: z.string().optional(),
            createRoom: z.boolean().default(false)
        }).refine(({createRoom,roomCode}) => {
            if(!createRoom && !roomCode) return false
        }, {
            message: "Código da sala é obrigatório"})
            
type homeFormData = z.infer< ReturnType<typeof homeFormSchema>>

export const HomeForm = () => {

    const { 
        register,
        handleSubmit,
        watch,
        formState: { errors }
      } = useForm<homeFormData>({
        resolver: zodResolver(homeFormSchema(["League of legends"]))
      })    

    const handleSwitchClick = (event: React.MouseEvent<HTMLInputElement>) => {        
        setCreateRoom(event.target.checked);
    }

    return(
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name">Nome:</label>
                <input {...register("name")} />
                {errors.name && <span>{errors.name.message}</span>}
            </div>
            <div>
                <label htmlFor="game">Quero um duo para:</label>
                
                {errors.name && <span>{errors.name.message}</span>}
            </div>   
            <CustomSwitch onClick={handleSwitchClick}/>
            <Footer isCreateRoom={createRoom}/>   
        </form>
                        
        </>
    )
}