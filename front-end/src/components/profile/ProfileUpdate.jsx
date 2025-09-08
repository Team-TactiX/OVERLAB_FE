import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import field from '../../img/field.png';

const POSITIONS = [
  { code: 'ST', top: '1vh', left: '20.3vh' },
  { code: 'LS', top: '4vh', left: '11.6vh' },
  { code: 'RS', top: '4vh', left: '29vh' },
  { code: 'LW', top: '7vh', left: '3.6vh' },
  { code: 'CF', top: '7vh', left: '20.3vh' },
  { code: 'RW', top: '7vh', left: '37.6vh' },
  { code: 'LAM', top: '13vh', left: '11.6vh' },
  { code: 'CAM', top: '13vh', left: '20.3vh' },
  { code: 'RAM', top: '13vh', left: '29vh' },
  { code: 'LM', top: '19vh', left: '3vh' },
  { code: 'LCM', top: '19vh', left: '11.6vh' },
  { code: 'CM', top: '19vh', left: '20.3vh' },
  { code: 'RCM', top: '19vh', left: '29vh' },
  { code: 'RM', top: '19vh', left: '37.6vh' },
  { code: 'LWB', top: '25vh', left: '3vh' },
  { code: 'LDM', top: '25vh', left: '11.6vh' },
  { code: 'CDM', top: '25vh', left: '20.3vh' },
  { code: 'RDM', top: '25vh', left: '29vh' },
  { code: 'RWB', top: '25vh', left: '37.6vh' },
  { code: 'LB', top: '31vh', left: '3vh' },
  { code: 'LCB', top: '31vh', left: '11.6vh' },
  { code: 'SW', top: '31vh', left: '20.3vh' },
  { code: 'RCB', top: '31vh', left: '29vh' },
  { code: 'RB', top: '31vh', left: '37.6vh' },
  { code: 'GK', top: '37vh', left: '20.3vh' },
];

const ProfileUpdate = () => {
  const [userName, setUserName] = useState('');
  const [userTel, setUserTel] = useState('');
  const [selected, setSelected] = useState([]);
  const userMail = sessionStorage.getItem('userMail');
  const password = sessionStorage.getItem('password');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `http://52.78.12.127:8080/api/users/check/${userMail}`,
        );
        if (!res.ok) throw new Error('유저 정보를 불러올 수 없습니다.');
        const data = await res.json();
        setUserName(data.userName);
        setUserTel(data.tel);
        setSelected(
          [data.firstPosition, data.secondPosition, data.thirdPosition].filter(
            Boolean,
          ),
        );
      } catch (err) {
        alert(err.message);
      }
    };
    fetchUser();
  }, [userMail]);

  const togglePosition = (pos) => {
    if (selected.includes(pos)) {
      setSelected(selected.filter((p) => p !== pos));
    } else if (selected.length < 3) {
      setSelected([...selected, pos]);
    } else {
      alert('포지션은 최대 3개까지 선택 가능합니다.');
    }
  };

  const handleSubmit = async () => {
    if (!userName || !userTel || selected.length !== 3) {
      alert('모든 항목을 입력하고 포지션 3개를 선택하세요.');
      return;
    }

    try {
      const res = await fetch('http://52.78.12.127:8080/api/users/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMail,
          password,
          userName,
          tel: userTel,
          firstPosition: selected[0],
          secondPosition: selected[1],
          thirdPosition: selected[2],
        }),
      });

      if (res.ok) {
        alert('회원 정보가 수정되었습니다.');
        navigate('/profile');
      } else {
        alert(await res.text());
      }
    } catch (err) {
      console.error(err);
      alert('서버와의 통신 중 문제가 발생했습니다.');
    }
  };

  return (
    // Container 스타일 적용
    <div className="flex flex-col items-center p-[3vh] px-[2vh]">
      {/* Title 스타일 적용 */}
      <h2 className="text-[2.4vh] font-bold mb-[4vh]">회원 정보 수정</h2>
      {/* StyledInput 스타일 적용 */}
      <input
        type="text"
        placeholder="이름"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="w-[40vh] h-[6vh] text-[2vh] rounded-[0.7vh] border border-[#b9b9b9] p-[1vh] mb-[2vh] box-border"
      />
      <input
        type="text"
        placeholder="전화번호"
        value={userTel}
        onChange={(e) => setUserTel(e.target.value)}
        className="w-[40vh] h-[6vh] text-[2vh] rounded-[0.7vh] border border-[#b9b9b9] p-[1vh] mb-[2vh] box-border"
      />
      {/* Subtitle 스타일 적용 */}
      <p className="mt-[4vh] mb-[2vh] text-[2.2vh] font-bold">
        선호 포지션 (3개 선택)
      </p>
      {/* FieldWrapper 스타일 적용 */}
      <div
        className="relative w-[49vh] h-[42vh] bg-contain bg-center bg-no-repeat mb-[2vh]"
        style={{ backgroundImage: `url(${field})` }}
      >
        {/* ButtonBox 스타일 적용 */}
        <div className="absolute w-full h-full">
          {POSITIONS.map(({ code, top, left }) => (
            // StyledButton 스타일 적용
            <button
              key={code}
              className={`
                absolute flex justify-center items-center cursor-pointer
                w-[8.2vh] h-[4vh] text-[1.5vh] rounded-[20vh] border-2 border-black
                ${
                  selected.includes(code)
                    ? 'bg-black text-white'
                    : 'bg-[#f0e439] text-black'
                }
              `}
              style={{ top, left }}
              onClick={() => togglePosition(code)}
            >
              {selected.includes(code)
                ? `${selected.indexOf(code) + 1}. ${code}`
                : code}
            </button>
          ))}
        </div>
      </div>
      {/* StyledSummitButton 스타일 적용 */}
      <button
        onClick={handleSubmit}
        className="bg-black text-white w-[40vh] h-[6vh] text-[2vh] rounded-[0.7vh] mb-[2vh] box-border hover:cursor-pointer"
      >
        회원정보 변경
      </button>
    </div>
  );
};

export default ProfileUpdate;
