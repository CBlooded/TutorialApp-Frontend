import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

import { useParams } from "react-router";
import axiosConfig from "../api/axiosConfig";
import { useNavigate } from "react-router";

type FormFields = {
  newPassword: string;
};

function ResetPasswordForm() {
  const [hostUUID, setHostUUID] = useState<string>("");
  const params = useParams();
  const feedback = useRef<HTMLDivElement>(null);
  const loginBtn = useRef<HTMLButtonElement>(null);
  let isPassChanged = false;
  const navigate = useNavigate();
  
  useEffect(() => {
    setHostUUID(params.hostUUID || "");
    try {
      const response = axiosConfig.get(
        `/api/v1/user/password/reset/host/validate?hostId=${params.hostUUID}`
      );
      // console.log(response);
      response
        .then(() => {
          feedback.current!.textContent = "";
        })
        .catch((err) => {
          feedback.current!.textContent = "Error occured, request failed";
          console.log(err);
        });
    } catch (error) {
      console.log(`error:${error}`);
    }
  }, [params.hostUUID]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    axiosConfig
      .put(`/api/v1/user/password/reset/${hostUUID}?n=${data.newPassword}`)
      .catch((err) => {
        console.log(err);
        feedback.current!.textContent = "Error occured, contact admin";
      })
      .then(() => {
        feedback.current!.textContent = "Password changed successfully";
        isPassChanged = true;
        loginBtn.current!.hidden = false;
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Reset password</h2>
        <div ref={feedback}> </div>
        {errors.newPassword && (
          <div className="incorrect-message">{errors.newPassword.message}</div>
        )}
        <input //disabled={validUser}
          {...register("newPassword", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            maxLength: 30,
            // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
          })}
          type="password"
        />
        <button ref={loginBtn} hidden={true} onClick={() => navigate("/")}>
          Log in
        </button>
        <button type="submit" disabled={isSubmitting || isPassChanged}>
          Submit
        </button>
      </form>
    </>
  );
}

export default ResetPasswordForm;
