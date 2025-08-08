import styled from 'styled-components';
import field from '../../img/field.png';
import { positionList } from '../../constants/positionList';
import playerIcon from '../../img/player.png';
import uniformIcon from '../../img/uniform.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SelectedPositionText = styled.p`
  margin-bottom: 2vh;
  font-size: 1.7vh;
  font-weight: bold;
  color: #00b140;
`;

const FieldWrapper = styled.div`
  position: relative;
  width: 49vh;
  height: 42vh;
  background-image: url(${field});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: 2vh;
`;

const ButtonBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const CheckBadge = styled.span`
  position: absolute;
  top: -2.3vh;
  right: -1.3vh;
  background-color: white;
  color: #00b140;
  font-size: 1.4vh;
  border-radius: 50%;
  width: 2vh;
  height: 2vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #00b140;
`;

const SubmitButton = styled.button`
  background-color: ${(props) => (props.disabled ? '#ccc' : 'black')};
  color: white;
  width: 90%;
  height: 6vh;
  font-size: 2vh;
  border-radius: 6px;
  margin-bottom: 2vh;
  box-sizing: border-box;
  border: none;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s ease;

  &:hover {
    opacity: ${(props) => (props.disabled ? 1 : 0.9)};
  }
`;

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
    <Container>
      <SelectedPositionText>
        선택한 포지션: {value.join(', ')}
      </SelectedPositionText>

      <FieldWrapper>
        <ButtonBox>
          {positionList.map(({ key, label, top, left }) => (
            <button
              key={key}
              $selected={value.includes(label)}
              onClick={() => togglePosition(label)}
            >
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
                <span className="text-white font-bold text-[1.8vh] whitespace-nowrap drop-shadow-[0_0_0.6vh_black] mt-[-2vh]">
                  {value.includes(label) && <CheckBadge>✔</CheckBadge>}
                  {label}
                </span>
              </div>
            </button>
          ))}
        </ButtonBox>
      </FieldWrapper>

      <SubmitButton onClick={onSubmit} disabled={value.length !== 3}>
        회원가입 완료
      </SubmitButton>
    </Container>
  );
};

export default SignUpPosition;
