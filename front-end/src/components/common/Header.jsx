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

const LogoImage = styled.img`
  height: 4.5vh;
  width: auto;
  &:hover {
    cursor: pointer;
  }
`;

const Header = () => {
  const navigate = useNavigate();

  const handleMove = () => {
    navigate('/main');
  };

  return (
    <header className="fixed left-auto top-0 text-left text-[3vh] font-[MarinesBold] px-[1vw] py-[2vh] w-app-width z-40 bg-[#f9f9f9]">
      <LogoImage src={logo} alt="logo" onClick={handleMove} />
    </header>
  );
};

export default Header;
