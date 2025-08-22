import { useState } from 'react';
import SignUpUserMail from './SignUpUserMail';
import SignUpInfo from './SignUpInfo';
import SignUpPosition from './SignUpPosition';
import useSignUp from '../../hooks/api/post/useSignUp';

function SignUp() {
  const [step, setStep] = useState(1);
  const [userMail, setUserMail] = useState('');
  const [info, setInfo] = useState({
    password: '',
    userName: '',
    tel: '',
  });
  const [selected, setSelected] = useState([]);
  const { signUp } = useSignUp();

  const handleSubmit = async () => {
    const body = JSON.stringify({
      userMail: userMail,
      password: info.password,
      userName: info.userName,
      tel: info.tel,
      firstPosition: selected[0],
      secondPosition: selected[1],
      thirdPosition: selected[2],
    });

    signUp({ body });
  };

  return (
    <div className="flex justify-center w-full">
      <div className="flex justify-center w-full">
        {step === 1 && (
          <SignUpUserMail
            value={userMail}
            onChange={setUserMail}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <SignUpInfo
            value={info}
            onChange={setInfo}
            onNext={() => setStep(3)}
          />
        )}
        {step === 3 && (
          <SignUpPosition
            value={selected}
            onChange={setSelected}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default SignUp;
