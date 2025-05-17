//import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useRef } from "react";
import { useNavigate } from "react-router";
import axiosConfig from "../api/axiosConfig";

import "./login-register-style.css";

/**
 * register component
 * This component is used to render the register form.
 * @param {string} name
 * @param {string} password
 * @returns {JSX.Element} register component
 */

type FormFields = {
  username: string;
  password: string;
};

function Register() {
  // form title referece
  const formTitle = useRef<HTMLHeadingElement>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  /***
   * onSubmit function
   * Function  used to handle form submission.
   * Debugging purpose: Data available in console log
   * @param {FormFields} data - form data
   *
   */
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const response = await axiosConfig.post("/api/v1/auth/register", data);
      const { token } = response.data;
      const { errorMessage } = response.data;
      console.log(`${errorMessage},${response.status}`);
      if (token) localStorage.setItem("token", token);
      if (response.status === 200 && errorMessage === null) navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 id="formTitle" ref={formTitle}>
        Sign in <br />
        <span style={{ visibility: "hidden" }}>Registration successful</span>
      </h2>
      {errors.username ? (
        <div className="incorrect-message">{errors.username.message}</div>
      ) : (
        <div
          className="incorrect-message invisible"
          style={{ visibility: "hidden" }}
        >
          ABC
        </div>
      )}
      <input
        {...register("username", {
          required: "Name is required",
          minLength: {
            value: 3,
            message: "Name must be at least 3 characters",
          },
          maxLength: 20,
          pattern: /^[A-Za-z]+$/i,
        })}
        type="text"
        placeholder="Enter name..."
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
          // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
        })}
        type="password"
        placeholder="Enter password..."
      />
      {errors.root && (
        <div className="incorrect-message">{errors.root.message}</div>
      )}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}

export default Register;
