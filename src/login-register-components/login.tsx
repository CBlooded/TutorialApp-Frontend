//import React, { useState } from "react";
import { set, useForm, type SubmitHandler } from "react-hook-form";
import React, { useRef } from "react";

import "./login-register-style.css";

/**
 * login component
 * This component is used to render the login form.
 * @param {string} name
 * @param {string} password
 * @returns {JSX.Element} Login component
 */

type FormFields = {
  name: string;
  password: string;
};

function Login() {
  // form title referece
  const formTitle = useRef<HTMLHeadingElement>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "John",
      password: "123456",
    },
  });

  /***
   * onSubmit function
   * Function  used to handle form submission.
   * Debugging purpose: Data available in console log
   * @param {FormFields} data - form data
   *
   */
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    // Simulate a server request, handling errors
    try {
      console.log(data);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for server response
      if (formTitle.current) {
        // update current form status
        formTitle.current.innerHTML = "Log in <br/> login successful";
      }
      throw new Error();
    } catch (error) {
      // example error handling
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 id="formTitle" ref={formTitle}>
        Log in <br />
        {/* <span style={{ visibility: "hidden" }}>Log in successful</span> */}
      </h2>
      {errors.name ? (
        <div className="incorrect-message">{errors.name.message}</div>
      ) : (
        <div // incorrect-message placholder
          className="incorrect-message invisible"
          style={{ visibility: "hidden" }}>
          
        </div>
      )}
      <input
        {...register("name", {
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

export default Login;
