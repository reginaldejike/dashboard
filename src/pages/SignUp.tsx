import { SubmitHandler, useForm } from 'react-hook-form';
import Aside from '../component/Aside';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignUp {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const [show, setShow] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUp>();

  const password = watch('password');

  const navigate = useNavigate();
  // const onSubmit: SubmitHandler<SignUp> = async (data) => {
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     console.log(data);
  //     setFormData(data);
  //     navigate("/dashboard");
  //     throw new Error();
  //   } catch (error) {
  //     setError("root", {
  //       message: "This email has already been taken",
  //     });
  //   }
  // };

  const registerUser = async (userData: Omit<SignUp, 'confirmPassword'>) => {
    const response = await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return data;
  };

  const onSubmit: SubmitHandler<SignUp> = async (data) => {
    try {
      const { confirmPassword, ...userData } = data;
      await registerUser(userData);
      navigate('/dashboard');
    } catch (error: unknown) {
      setError('root', { message: 'Failed to fetch users' });
      return;
    }
  };

  const handleShowPassword = () => {
    setShow(!show);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <div className='container'>
        <div className='login'>
          <Aside />
          <div className='login-section'>
            <h2>Welcome</h2>
            <p>Enter Your details to Register</p>
            <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
              <div className='form-input'>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    validate: (value) => {
                      if (!value.includes('@')) {
                        return 'Email must include @';
                      }
                      return true;
                    },
                  })}
                  id='email'
                  type='email'
                  placeholder='Email'
                  className='input-email'
                />
                {errors.email && (
                  <div className='text-color'> {errors.email.message}</div>
                )}
              </div>
              <div className='form-input'>
                <input
                  {...register('username', {
                    required: 'Username is required',
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    minLength: {
                      value: 3,
                      message: 'Username must be at least 3 characters',
                    },
                  })}
                  id='username'
                  type='text'
                  placeholder='Username'
                  className='input-email'
                />
                {errors.username && (
                  <div className='text-color'> {errors.username.message}</div>
                )}
              </div>
              <div className='form-input'>
                <div className='input-show'>
                  <input
                    id='password'
                    type={show ? 'text' : 'password'}
                    placeholder='Password'
                    className='input-password'
                    {...register('password', {
                      required: 'Password is required',
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          'must have atleast one character, one uppercase, one lowercase one digit, one special character ',
                      },
                      minLength: {
                        value: 8,
                        message: 'Password must have at least 8 character',
                      },
                    })}
                  />
                  <p
                    role='button'
                    onClick={handleShowPassword}
                    className='show'
                  >
                    {show ? 'Hide' : 'show'}
                  </p>
                </div>
                {errors.confirmPassword && (
                  <div className='text-color'>
                    {' '}
                    {errors.confirmPassword.message}
                  </div>
                )}
              </div>
              <div className='form-input'>
                <div className='input-show'>
                  <input
                    id='c-password'
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Confirm Password'
                    className='input-password'
                    {...register('confirmPassword', {
                      required: 'Password is required',
                      validate: (value) => {
                        if (value !== password) {
                          return 'Password does not match';
                        }
                        return true;
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          'must have atleast one character, one uppercase, one lowercase one digit, one special character ',
                      },
                      minLength: {
                        value: 8,
                        message: 'Password must have at least 8 character',
                      },
                    })}
                  />
                  <p
                    role='button'
                    onClick={handleShowConfirmPassword}
                    className='show'
                  >
                    {showConfirmPassword ? 'Hide' : 'show'}
                  </p>
                </div>
                {errors.password && (
                  <div className='text-color'> {errors.password.message}</div>
                )}
                <button disabled={isSubmitting} className='login-button'>
                  {isSubmitting ? 'Loading..' : 'Log in'}
                </button>
                {errors.root && (
                  <div className='text-color'> {errors.root.message}</div>
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
