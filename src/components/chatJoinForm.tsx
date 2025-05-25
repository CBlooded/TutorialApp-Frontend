import { useForm, type SubmitHandler } from "react-hook-form";

type FormFields = {
  roomKey: string;
};

type ChatJoinFormProps = {
  onRoomJoined: () => void;
};

function ChatJoinForm({ onRoomJoined }: ChatJoinFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      roomKey: "#key12",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    sessionStorage.setItem("roomKey", data.roomKey);
    onRoomJoined();
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Join to Chat Room</h2>
      {errors.roomKey && (
        <div className="incorrect-message">{errors.roomKey.message}</div>
      )}
      <input
        {...register("roomKey", {
          required: "Room key is required",
          pattern: {
            value: /^#/,
            message: "Room key must start with '#'",
          },
          minLength: {
            value: 6,
            message: "Room key must be exactly 6 characters",
          },
          maxLength: {
            value: 6,
            message: "Room key must be exactly 6 characters",
          },
        })}
        type="text"
        placeholder="Enter room key..."
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Joining room" : "Submit"}
      </button>
    </form>
  );
}

export default ChatJoinForm;
