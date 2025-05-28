import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import axiosConfig from "../api/axiosConfig";
import { useRef } from "react";

/**
 * ForgotPassword component
 * This component is used to render the forgot password form.
 * @param {FormFields} data - form data
 * @returns {JSX.Element} ForgotPassword component
 */

/**
 * ForgotPassword component
 * This component is used to render the forgot password form.
 * @returns {JSX.Element} ForgotPassword form
 * @param {string} username - user for which password is to be reset
 */
function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const navigate = useNavigate();

  type FormFields = {
    username: string;
  };

  const feedback = useRef<HTMLDivElement>(null);
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    try {
      await axiosConfig.post(
        `/api/v1/user/password/reset/host?u=${data.username}`
      );
      feedback.current!.textContent = "Email sent successfully\nCheck your inbox";
        // navigate("/");
    } catch (error) {
      console.log(`error:${error}`);
      feedback.current!.textContent = "Error occured, check your username";
    }
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Send password reset email</h2>
        <div ref={feedback}> </div>
        {errors.username && (
          <div className="incorrect-message">{errors.username.message}</div>
        )}
        <input
          {...register("username", { required: "Username is required" })}
          type="text"
          placeholder="Enter username..."
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
