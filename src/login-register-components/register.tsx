//import React, { useState } from "react";
import { set, useForm, type SubmitHandler } from "react-hook-form";
import React, { useRef } from "react";

import "./register-style.css";

/**
 * register component
 * This component is used to render the register form.
 * @param {string} name 
 * @param {string} email 
 * @param {string} password
 * @returns {JSX.Element} Login component
 */

type FromFields = {
  name: string;
  email: string;
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
  } = useForm<FromFields>({
    defaultValues: {
      name: "John",
      email: "JohnDoe@domain.xx",
      password: "123456",
    }
  });

  /*** 
   * onSubmit function
   * Function  used to handle form submission.
   * Debugging purpose: Data available in console log 
   * @param {FromFields} data - form data
   * 
   */
  const onSubmit: SubmitHandler<FromFields> = async (data) => {
    // Simulate a server request, handling errors
    try {
      console.log(data);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for server response
      if (formTitle.current) { // update current form status
        formTitle.current.innerHTML = 
        "Sign in <br/> Registration successful";
      }
      throw new Error();
    } catch (error) {
      // example error handling
      setError("email", {
        message: "Email already exists"
      });
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 id="formTitle" ref={formTitle}>Sign in</h2>
      {errors.name && (
        <div className="incorrect-message">{errors.name.message}</div>
      )}
      <input
        {...register("name", {
          required: "Name is required",
          minLength: 3,
          maxLength: 20,
          pattern: /^[A-Za-z]+$/i,
        })}
        type="text"
        placeholder="Enter name..."
      />
      {errors.email && (
        <div className="incorrect-message">{errors.email.message}</div>
      )}
      <input
        {...register("email", {
          required: "email is required",
          //   pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          validate: (value) => {
            if (!value.includes('@')) {
              return "Email must contain @";
            }
            return true;
          },
        })}
        type="text"
        placeholder="Enter e-mail..."
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
