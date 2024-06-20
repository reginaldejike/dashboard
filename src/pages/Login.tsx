import "../styles/Login.css";
import { SubmitHandler, useForm } from "react-hook-form";
import pablo from "../assets/pablo-sign-in.svg";
import { useState } from "react";

interface Login {
  email: "";
  password: "";
}

const Login = () => {
  const [show, setShow] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Login>();

  const onSubmit: SubmitHandler<Login> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
      throw new Error();
    } catch (error) {
      setError("root", {
        message: "This email has already been taken",
      });
    }
  };

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <>
      <div className="container">
        <div className="login">
          <div className="image-section">
            <img src={pablo} alt="pablo" />
          </div>
          <div className="login-section">
            <h2>Welcome!</h2>
            <p>Enter details to login</p>
            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
              <div className="form-input">
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    validate: (value) => {
                      if (!value.includes("@")) {
                        return "Email must include @";
                      }
                      return true;
                    },
                  })}
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="input-email"
                />
                {errors.email && (
                  <div className="text-color"> {errors.email.message}</div>
                )}
              </div>
              <div className="form-input">
                <div className="input-show">
                  <input
                    id="password"
                    type={show ? "text" : "password"}
                    placeholder="Password"
                    className="input-password"
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "must have atleast one character, one uppercase, one lowercase one digit, one special character ",
                      },
                      minLength: {
                        value: 8,
                        message: "Password must have at least 8 character",
                      },
                    })}
                  />
                  <p role="button" onClick={handleShow} className="show">
                    {show ? "Hide" : "show"}
                  </p>
                </div>
                {errors.password && (
                  <div className="text-color"> {errors.password.message}</div>
                )}
              </div>
              <button className="forget-password">Forget password? </button>
              <button disabled={isSubmitting} className="login-button">
                {isSubmitting ? "Loading.." : "Log in"}
              </button>
              {errors.root && (
                <div className="text-color"> {errors.root.message}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
