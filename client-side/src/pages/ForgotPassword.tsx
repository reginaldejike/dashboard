import '../styles/Login.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import Aside from '../component/Aside';
import { useNavigate } from 'react-router-dom';

interface ForgotPassword {
  email: '';
}

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPassword>();

  const navigate = useNavigate();

  const loginUser = async (userData: ForgotPassword) => {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  };

  const onSubmit: SubmitHandler<ForgotPassword> = async (data) => {
    try {
      await loginUser(data);
      navigate('/dashboard');
    } catch (error) {
      setError('root', {
        message: 'Invalid email',
      });
    }
  };

  return (
    <>
      <div className='container'>
        <div className='login'>
          <Aside />
          <div className='login-section'>
            <p>Enter Email to Reset Password</p>
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

              <button disabled={isSubmitting} className='login-button'>
                {isSubmitting ? 'Loading..' : 'Reset Password'}
              </button>
              {errors.root && (
                <div className='text-color'> {errors.root.message}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
