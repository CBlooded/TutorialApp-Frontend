import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";



/**
 * ForgotPassword component
 * This component is used to render the forgot password form.
 * @param {FormFields} data - form data
 * @returns {JSX.Element} ForgotPassword component
 */

function ForgotPassword() {

  const { 
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const navigate = useNavigate();

  type FormFields = {
    email: string;
    password: string;
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try{
        console.log("success\n",data);
    } catch (ee) {
        console.log("data submit failed\n", ee);
    }
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Reset Password</h2>
      {errors.email && (
        <div className="incorrect-message">{errors.email.message}</div>
      )}
        <input
          {...register("email", {
            required: "Email is required",
            validate: (value) => {
              if (!value.includes("@")) return "Email address must contain @";
              if (!value.includes(".")) return "Email address must contain .";
              if (value.indexOf("@") === 0)
                return "Email address cannot start with @";
              if (!value.split("@")[1]?.includes(".")) return "Invalid domain";
              if (value.split("@")[1].charAt(0) == ".") return "Invalid domain";
              if (value.lastIndexOf(".") === value.length - 1)
                return "Invalid domain after .";

              return true;
            },
            maxLength: 50,
          })}
          type="text"
          placeholder="Enter email..."
        />
        {errors.password && (
          <div className="incorrect-message">{errors.password.message}</div>
        )}
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            maxLength: 30,
          })}
          type="password"
          placeholder="Enter password..."
        />
        <button onClick={() => navigate("/")}>Return</button>
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </>
  );
}

export default ForgotPassword;
