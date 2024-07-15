import { SubmitHandler, useForm } from "react-hook-form";
import Aside from "../component/Aside";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SignUp {
  email: string;
  username: string;
  password: string;
  comfirmPassword: string;
}

const SignUp = () => {
  const [show, setShow] = useState<boolean>(false);
  const [formData, setFormData] = useState<SignUp>({} as SignUp);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUp>();

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<SignUp> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
      setFormData(data);
      navigate("/dashboard");
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
          <Aside />
          <div className="login-section">
            <h2>Welcome</h2>
            <p>Enter Your details to Register</p>
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
                <input
                  {...register("username", {
                    required: "Email is required",
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  })}
                  id="email"
                  type="text"
                  placeholder="Username"
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
              <div className="form-input">
                <div className="input-show">
                  <input
                    id="c-password"
                    type={show ? "text" : "password"}
                    placeholder="Comfirm Password"
                    className="input-password"
                    {...register("comfirmPassword", {
                      required: "Password is required",
                      validate: (value) => {
                        if (value !== formData.password) {
                          return "Password does not match";
                        }
                        return true;
                      },
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
                <button disabled={isSubmitting} className="login-button">
                  {isSubmitting ? "Loading.." : "Log in"}
                </button>
                {errors.root && (
                  <div className="text-color"> {errors.root.message}</div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
