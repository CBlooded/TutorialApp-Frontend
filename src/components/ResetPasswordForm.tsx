import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect } from "react";

import { useParams } from "react-router";
import { useState } from "react";
import axiosConfig from "../api/axiosConfig";

type FormFields = {
  newPassword: string;
};

function ResetPasswordForm() {
  const [hostUUID, setHostUUID] = useState<string>("");
  const params = useParams();

  useEffect(() => {
    setHostUUID(params.hostUUID || "");
    try {
      const response = axiosConfig.get(
        `/api/v1/user/password/reset/host/validate?hostId=${params.hostUUID}`
      );
      console.log(response);
      response
        .then(() => {
          // zmien
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(`error:${error}`);
    }
  }, []);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    axiosConfig
      .put(`/api/v1/user/password/reset/${hostUUID}?n=${data.newPassword}`)
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        console.log("haslo zmienione");
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  return (
    <>
      <div></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.newPassword && (
          <div className="incorrect-message">{errors.newPassword.message}</div>
        )}
        <input //disabled={validUser}
          {...register("newPassword", { required: true })}
          type="text"
          placeholder="provide uui"
        />
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </>
  );
}

export default ResetPasswordForm;
