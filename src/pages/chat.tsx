import NavBar from "../components/NavBar";
import { useForm, type SubmitHandler } from "react-hook-form";

type FormFields = {
  username: string;
  roomKey: string;
};

function ChatPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      username: "user",
      roomKey: "key123",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    // Simulate a server request, handling errors
    try {
      console.log(data);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for server response
      // navigate("/app");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Join to Chat Room</h2>
        {errors.username && (
          <div className="incorrect-message">{errors.username.message}</div>
        )}
        <input
          {...register("username", {
            required: "username key is required",
          })}
          type="text"
          placeholder="Enter your username..."
        />
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
            minLength: { value: 6, message: "Room key must be exactly 6 characters" },
            maxLength: { value: 6, message: "Room key must be exactly 6 characters" },
          })}
          type="text"
          placeholder="Enter room key..."
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Joining room" : "Submit"}
        </button>
      </form>
    </>
  );
}

export default ChatPage;
