import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/logo.png';

const HeaderWrapper = styled.header`
  position: fixed;
  text-align: left;
  font-size: 3vh;
  font-family: 'MarinesBold', sans-serif;
  padding: 2vh 1vw;
  width: 100%;
  z-index: 40;
  background-color: #f9f9f9;
`;

const LogoWrapper = styled.div`
  position: relative;
  height: 4.5vh;
  width: auto;
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: left;
  z-index: 40;
  &:hover {
    cursor: pointer;
  }
`;

const Header = () => {
  const navigate = useNavigate();

  const hanbleMove = () => {
    navigate('/main');
  };

  return (
    <HeaderWrapper>
      <LogoWrapper onClick={hanbleMove} />
    </HeaderWrapper>
  );
};

export default Header;
