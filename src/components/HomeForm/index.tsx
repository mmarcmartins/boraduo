import { CustomSwitch } from "../CustomSwitch";
import { Footer } from "./Footer";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import "./styles.scss";
import { SelectAutoComplete } from "../SelectAutoComplete";

const availableGames = ["League of legends", "Call of duty"];

const homeFormSchema = (gameOptions: string[]) =>
  z
    .object({
      name: z
        .string()
        .min(3, "Minimo de 3 caracteres")
        .max(20, "O nome pode conter no máximo 20 caracteres"),
      game: z
        .string()
        .min(1, "Por favor selecione um jogo")
        .refine(
          (val) => availableGames.includes(val),
          "Selecione um jogo válido",
        ),
      roomCode: z.string().optional(),
      JoinRoom: z.boolean().default(true),
    })
    .refine(
      ({ JoinRoom, roomCode }) => {
        if (JoinRoom && !roomCode) return false;
      },
      {
        message: "Código da sala é obrigatório",
      },
    );

type homeFormData = z.infer<ReturnType<typeof homeFormSchema>>;

export const HomeForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    clearErrors,
    formState: { errors },
  } = useForm<homeFormData>({
    resolver: zodResolver(homeFormSchema(availableGames)),
    mode: "onBlur",
  });

  const watchJoinRoom = watch("JoinRoom", false);

  const disabledJoinClass = !watchJoinRoom ? "disabled" : "";

  const onSubmit = (data: homeFormData) => {
    console.log(data);
  };

  return (
    <form className="home-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="content">
        <div className="input-holder">
          <label htmlFor="name">Nome:</label>
          <input type="text" {...register("name")} />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>
        <div className="input-holder">
          <label htmlFor="game">Quero um duo para:</label>
          <SelectAutoComplete
            {...register("game")}
            items={availableGames}
            onBlur={() => {
              trigger("game");
            }}
            onValidate={() => {
              clearErrors("game");
            }}
            onSelectItem={(newValue) => {
              setValue("game", newValue);
            }}
          />
          {errors.game && <span className="error">{errors.game.message}</span>}
        </div>

        <div className={`input-holder ${disabledJoinClass}`}>
          <label htmlFor="roomCode">Código da sala</label>
          <input
            type="text"
            disabled={!!disabledJoinClass}
            {...register("roomCode")}
          />
          {errors.roomCode && (
            <span className="error">{errors.roomCode.message}</span>
          )}
        </div>

        <div className="switch-description">
          <CustomSwitch {...register("JoinRoom")} />
          <span>Criar sala / entrar na sala</span>
        </div>
      </div>
      <Footer
        disabled={Object.keys(errors).length > 0}
        isJoinRoom={watchJoinRoom}
      />
    </form>
  );
};
