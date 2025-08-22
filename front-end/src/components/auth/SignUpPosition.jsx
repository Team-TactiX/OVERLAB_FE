import field from '../../img/field.png';
import { positionList } from '../../constants/positionList';
import playerIcon from '../../img/player.png';
import uniformIcon from '../../img/uniform.png';

const SignUpPosition = ({ value, onChange, onSubmit }) => {
  const togglePosition = (position) => {
    if (value.includes(position)) {
      onChange(value.filter((p) => p !== position));
    } else if (value.length < 3) {
      onChange([...value, position]);
    } else {
      alert('최대 3개까지 선택 가능합니다.');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <p className="mb-[2vh] text-[1.7vh] font-bold text-[#00B140]">
        선택한 포지션: {value.join(', ')}
      </p>

      <div
        className="relative w-[49vh] h-[42vh] bg-no-repeat bg-center bg-[length:100%_100%] mb-[2vh]"
        style={{ backgroundImage: `url(${field})` }}
      >
        <div className="absolute w-full h-full">
          {positionList.map(({ key, label, top, left }) => (
            <button key={key} onClick={() => togglePosition(label)}>
              <div
                className="absolute flex flex-col items-center"
                style={{
                  top,
                  left,
                  transform: 'translate(-0%, -0%)',
                }}
              >
                <img
                  src={value.includes(label) ? uniformIcon : playerIcon}
                  alt="player"
                  className="w-[4.5vh] h-[4.5vh] object-contain"
                />
                <span className="relative text-white font-bold text-[1.8vh] whitespace-nowrap drop-shadow-[0_0_0.6vh_black] mt-[-2vh]">
                  {value.includes(label) && (
                    <span className="absolute top-[-2.3vh] right-[-1.3vh] bg-white text-[#00B140] text-[1.4vh] rounded-full w-[2vh] h-[2vh] flex justify-center items-center border border-[#00B140]">
                      ✔
                    </span>
                  )}
                  {label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={value.length !== 3}
        className="bg-black text-white w-[90%] h-[6vh] text-[2vh] rounded-[6px] mb-[2vh] border-none cursor-pointer transition-colors duration-300 ease-in-out hover:opacity-90 disabled:bg-[#ccc] disabled:cursor-not-allowed disabled:hover:opacity-100"
      >
        회원가입 완료
      </button>
    </div>
  );
};

export default SignUpPosition;
