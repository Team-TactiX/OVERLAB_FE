import { Link, useLocation } from 'react-router-dom';
import {
  MdHome,
  MdGroup,
  MdSportsSoccer,
  MdMap,
  MdAccountCircle,
} from 'react-icons/md';

const BottomTab = () => {
  const location = useLocation();
  const userId = sessionStorage.getItem('userId');
  const navItems = [
    { to: '/main', Icon: MdHome, label: '홈' },
    { to: '/teams', Icon: MdGroup, label: '팀 목록' },
    { to: '/feed', Icon: MdSportsSoccer, label: '경기 모집' },
    { to: '/lib', Icon: MdMap, label: '전술' },
    { to: `/profile/${userId}`, Icon: MdAccountCircle, label: '프로필' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 w-full max-w-md -translate-x-1/2 transform bg-white h-20 flex justify-around items-center shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-[1001]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.to;
        return (
          <Link
            key={item.label}
            to={item.to}
            className={`flex flex-col items-center gap-[0.5vh] text-[2.5vh] no-underline ${
              isActive ? 'text-[#00C851]' : 'text-[#ccc]'
            }`}
          >
            <item.Icon />
            <span className="text-[1.2vh]">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomTab;
