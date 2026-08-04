import { useRef, useState } from 'react';
import Aside from '../component/Aside';

const Otp = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

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

  return (
    <div className='container'>
      <div className='login'>
        <Aside />
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
            style={{
              width: '50px',
              height: '50px',
              textAlign: 'center',
              fontSize: '20px',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Otp;
