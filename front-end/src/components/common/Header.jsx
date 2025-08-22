import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Header = () => {
  return (
    <header className="fixed top-0 w-full max-w-md bg-gray-100 px-4 py-3 z-50">
      <Link to="/main" className="inline-block w-fit">
        <img src={logo} alt="OVERLAB" className="h-10 w-auto" />
      </Link>
    </header>
  );
};

export default Header;
