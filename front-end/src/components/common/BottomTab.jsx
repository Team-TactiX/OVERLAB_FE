import { Link, useLocation } from 'react-router-dom';
import {
  MdHome,
  MdGroup,
  MdSportsSoccer,
  MdMap,
  MdAccountCircle,
} from 'react-icons/md';
import styled from 'styled-components';

const TabItem = styled(Link)`
  color: ${(props) => (props.$active === 'true' ? '#00C851' : '#ccc')};
  font-size: 2.5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  gap: 0.5vh;
`;

const Label = styled.span`
  font-size: 1.2vh;
`;

const BottomTab = () => {
  const location = useLocation();
  const userId = sessionStorage.getItem('userId');

  return (
    <nav className="fixed bottom-0 left-1/2 w-app-width max-w-[100vw] h-[7vh] bg-white flex justify-around items-center shadow-[0_-2px_10px_rgba(0,0,0,0.1)] -translate-x-1/2 z-40">
      <TabItem to="/main" $active={(location.pathname === '/main').toString()}>
        <MdHome />
        <Label>홈</Label>
      </TabItem>
      <TabItem
        to="/teams"
        $active={(location.pathname === '/teams').toString()}
      >
        <MdGroup />
        <Label>팀 목록</Label>
      </TabItem>
      <TabItem to="/feed" $active={(location.pathname === '/feed').toString()}>
        <MdSportsSoccer />
        <Label>경기 모집</Label>
      </TabItem>
      <TabItem to="/lib" $active={(location.pathname === '/lib').toString()}>
        <MdMap />
        <Label>전술</Label>
      </TabItem>
      <TabItem
        to={`/profile/${userId}`}
        $active={(location.pathname === `/profile/${userId}`).toString()}
      >
        <MdAccountCircle />
        <Label>프로필</Label>
      </TabItem>
    </nav>
  );
};

export default BottomTab;
