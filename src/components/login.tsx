//import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useRef } from "react";

import "./login-register-style.css";
import { useNavigate } from "react-router";
import axiosConfig from "../api/axiosConfig";

/**
 * login component
 * This component is used to render the login form.
 * @param {string} username
 * @param {string} password
 * @returns {JSX.Element} Login component
 */

type FormFields = {
  username: string;
  password: string;
};

function Login() {
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
      const response = await axiosConfig.post(
        "/api/v1/auth/authenticate",
        data
      );
      const { token } = response.data;
      const { errorMessage } = response.data;
      console.log(
        `State of response:\nErrMsg:${errorMessage}\nStatus:${response.status}`
      );
      if (token) {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("username", data.username);
      }
      if (
        response.status === 200 &&
        (errorMessage === null || errorMessage === undefined)
      )
        navigate("/dashboard");
    } catch (error) {
      console.log(`error:${error}`);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 id="formTitle" ref={formTitle}>
        Log in <br />
        {/* <span style={{ visibility: "hidden" }}>Log in successful</span> */}
      </h2>
      {errors.username ? (
        <div className="incorrect-message">{errors.username.message}</div>
      ) : (
        <div // incorrect-message placholder
          className="incorrect-message invisible"
          style={{ visibility: "hidden" }}
        ></div>
      )}
      <input
        {...register("username", {
          required: "username is required",
          minLength: {
            value: 3,
            message: "username must be at least 3 characters",
          },
          maxLength: 20,
          //pattern: /^[A-Za-z]+$/i,
        })}
        type="text"
        placeholder="Enter username..."
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
      <button
        type="button"
        onClick={() => {
          navigate("/register");
        }}
      >
        Register?
      </button>
      <button
        type="button"
        onClick={() => {
          navigate("/forgotPassword");
        }}
      >
        Forgot password?
      </button>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}

export default Login;
