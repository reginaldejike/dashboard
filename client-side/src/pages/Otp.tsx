import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Aside from '../component/Aside';
import '../styles/otp.css';

interface OtpForm {
  otp: string;
}
const Otp = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<OtpForm>();

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const onSubmit: SubmitHandler<OtpForm> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
      data.otp = otp.join('');

      // navigate('/otp');
    } catch (error) {
      setError('root', {
        message: 'Invalid OTP',
      });
    }
  };

  return (
    <div className='container'>
      <div className='login'>
        <Aside />
        <div className='otp-section'>
          <h3>Enter OTP</h3>

          <form onSubmit={handleSubmit(onSubmit)} className='otp-form'>
            <div className='otp-inputs'>
              {otp.map((digit, index) => (
                <input
                  {...register('otp', {
                    required: 'OTP is required',
                    pattern: /^\d{6}$/,
                  })}
                  key={index}
                  type='text'
                  inputMode='numeric'
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => {
                    if (inputs.current) {
                      inputs.current[index] = el;
                    }
                  }}
                  className='otp-input'
                />
              ))}
            </div>
            {errors.otp && (
              <div className='text-color'> {errors.otp.message}</div>
            )}
            <div>
              <button disabled={isSubmitting} className='login-button'>
                {isSubmitting ? 'Loading..' : 'Submit OTP'}
              </button>
            </div>
            {errors.root && (
              <div className='text-color'> {errors.root.message}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Otp;
