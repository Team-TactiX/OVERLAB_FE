// TeamUpdate.jsx: 팀원 목록 제목과 리스트만 보여줌
import { useEffect, useState } from 'react';
import altImage from '../../img/alt_image.png';
import UniformIcon from '../common/UniformIcon';
import TeamMemberList from './TeamMemberList';

const TeamUpdate = ({ team, setTeam, setLogoFile, teamId }) => {
  const [teamName, setTeamName] = useState('');
  const [location, setLocation] = useState('');
  const [firstColor, setFirstColor] = useState('');
  const [secondColor, setSecondColor] = useState('');
  const [logo, setLogo] = useState(null);
  const [teamUser, setTeamUser] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      const res = await fetch(`http://52.78.12.127:8080/api/teams/${teamId}`);
      const data = await res.json();
      setTeam(data);
      setTeamName(data.teamName);
      setLocation(data.location);
      setFirstColor(data.firstColor);
      setSecondColor(data.secondColor);
      if (data.logo) {
        setLogo(`http://52.78.12.127:8080/logos/${data.logo}`);
      } else {
        setLogo(altImage);
      }

      const userRes = await fetch(
        `http://52.78.12.127:8080/api/teams/${teamId}/users-in-team`,
      );
      setTeamUser(await userRes.json());
    };

    fetchTeam();
  }, [teamId]);

  useEffect(() => {
    setTeam((prev) => ({
      ...prev,
      teamName,
      location,
      firstColor,
      secondColor,
    }));
  }, [teamName, location, firstColor, secondColor]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setLogoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setLogo(reader.result);
    reader.readAsDataURL(file);
  };

  if (!team) return <div className="text-center py-10">로딩 중...</div>;

  return (
    // Container 스타일 적용
    <div className="flex flex-col gap-[3vh] p-10 px-[2vh]">
      {/* 팀 프로필 */}
      {/* Row 스타일 적용 */}
      <div className="flex items-center gap-[2vh] w-full">
        <label>
          {/* ImagePreview 스타일 적용 */}
          <img
            src={logo}
            onError={(e) => (e.target.src = altImage)}
            alt="팀 로고"
            className="w-[10vh] h-[10vh] rounded-full object-cover"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </label>

        <div className="flex-1">
          {/* Label 스타일 적용 */}
          <label className="block text-[1.5vh] font-bold mb-[0.5vh]">
            팀명
          </label>
          {/* Input 스타일 적용 */}
          <input
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full p-[1.2vh] border border-[#ccc] rounded-[0.7vh] text-[1.6vh] mb-[1vh]"
          />
          {/* Label 스타일 적용 */}
          <label className="block text-[1.5vh] font-bold mb-[0.5vh]">
            위치
          </label>
          {/* Input 스타일 적용 */}
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-[1.2vh] border border-[#ccc] rounded-[0.7vh] text-[1.6vh] mb-[1vh]"
          />
        </div>
      </div>

      {/* 유니폼 색상 */}
      {/* UniformBox 스타일 적용 */}
      <div className="flex items-center justify-center gap-[5vh] py-[2vh] border-t border-b border-[#ddd]">
        {/* UniformColor 스타일 적용 */}
        <div className="flex items-center gap-[1vh]">
          {/* UniformLabel 스타일 적용 */}
          <span className="text-[1.4vh] font-medium mr-[0.5vh]">HOME</span>
          <UniformIcon color={firstColor} size="30px" />
          <input
            type="color"
            value={firstColor}
            onChange={(e) => setFirstColor(e.target.value)}
            className="w-10 h-6 border cursor-pointer"
          />
        </div>

        {/* UniformColor 스타일 적용 */}
        <div className="flex items-center gap-[1vh]">
          {/* UniformLabel 스타일 적용 */}
          <span className="text-[1.4vh] font-medium mr-[0.5vh]">AWAY</span>
          <UniformIcon color={secondColor} size="30px" />
          <input
            type="color"
            value={secondColor}
            onChange={(e) => setSecondColor(e.target.value)}
            className="w-10 h-6 border cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default TeamUpdate;
