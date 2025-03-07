import { CustomSwitch } from "../CustomSwitch";
import { Footer } from "./Footer";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import "./styles.scss";
import { SelectAutoComplete } from "../SelectAutoComplete";

const availableGames = ["League of legends", "Call of duty"];

type homeFormData = z.infer<ReturnType<typeof homeFormSchema>>;

const homeFormSchema = (gameOptions: string[]) =>
  z
    .object({
      name: z
        .string()
        .min(5, "Minimo de 5 caracteres")
        .max(20, "O nome pode conter no máximo 20 caracteres"),
      game: z
        .string()
        .optional(),
      roomCode: z.string().optional(),
      joinRoom: z.boolean(),
    })
    .refine(
      ({ joinRoom, roomCode }) => {
        if (joinRoom && roomCode === "") return false;
        return true;
      },
      {
        message: "Código da sala é obrigatório",
        path: ["roomCode"],
      },
    )
    .refine(
      ({ joinRoom, game }) => {
        if (joinRoom && game !== "") return true;
        if (!availableGames.includes(game ?? '')) return false;
        if (game === "") return false;
        return true;
      },
      { message: "Selecione um jogo", path: ["game"] },
    )

const toBoolean = (val: string) => (val === "" ? false : true);

export const HomeForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm<homeFormData>({
    resolver: zodResolver(homeFormSchema(availableGames)),
    mode: "onBlur",
    defaultValues: {
      game: "",
      name: "",
      roomCode: "",
      joinRoom: false,
    },
  });

  const watchJoinRoom = getValues("joinRoom");

  const disabledJoinClass = !watchJoinRoom ? "disabled" : "";
  const disableSelectGame = watchJoinRoom ? "disabled" : "";
  const { onChange: onChangeSwitch, ...registerJoinRoom } =
    register("joinRoom");

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeSwitch(event);
    clearErrors(["game", "roomCode"]);
    if (event.target.checked) {
      resetField("game");
      return;
    }
    resetField("roomCode");
  };

  const onSubmit = (data: homeFormData) => {    
    const result = homeFormSchema(availableGames).safeParse(data);
    if(!result.success) return;
    console.log('passou');
  };

  return (
    <form className="home-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="content">
        <div className="input-holder">
          <label htmlFor="name">Nome:</label>
          <input type="text" {...register("name")} />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>
        <div className={`input-holder ${disableSelectGame}`}>
          <label htmlFor="game">Quero um duo para:</label>
          <SelectAutoComplete
            {...register("game")}
            items={availableGames}
            disabled={toBoolean(disableSelectGame)}
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
            disabled={toBoolean(disabledJoinClass)}
            {...register("roomCode")}
          />
          {errors.roomCode && (
            <span className="error">{errors.roomCode.message}</span>
          )}
        </div>

        <div className="switch-description">
          <CustomSwitch onChange={handleSwitchChange} {...registerJoinRoom} />
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
