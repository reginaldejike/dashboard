import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Aside from '../component/Aside';
import '../styles/otp.css';

interface OtpForm {
  otp: string;
}
const Otp = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [isComplete, setIsComplete] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<OtpForm>();

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    setValue('otp', newOtp.join(''), {
      shouldValidate: true,
      shouldDirty: true,
    });

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
      setIsComplete(true);
      setOtp(Array(6).fill(''));
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
          {!isComplete ? (
            <>
              <h3>Enter OTP</h3>

              <form onSubmit={handleSubmit(onSubmit)} className='otp-form'>
                <input
                  type='hidden'
                  {...register('otp', {
                    required: 'OTP is required',
                    pattern: {
                      value: /^\d{6}$/,
                      message: 'OTP must be 6 digits',
                    },
                  })}
                />
                <div className='otp-inputs'>
                  {otp.map((digit, index) => (
                    <input
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
            </>
          ) : (
            <div className='success-message'>
              <h3>OTP Verified Successfully!</h3>
              <p>You can now proceed to reset your password.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Otp;
