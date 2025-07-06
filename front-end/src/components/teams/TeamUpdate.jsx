// TeamUpdate.jsx: 팀원 목록 제목과 리스트만 보여줌
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import altImage from '../../img/alt_image.png';
import UniformIcon from '../common/UniformIcon';
import TeamMemberList from './TeamMemberList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3vh;
  padding: 5vh 2vh;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 2vh;
  width: 100%;
`;

const ImagePreview = styled.img`
  width: 10vh;
  height: 10vh;
  border-radius: 50%;
  object-fit: cover;
`;

const Input = styled.input`
  width: 100%;
  padding: 1.2vh;
  border: 1px solid #ccc;
  border-radius: 0.7vh;
  font-size: 1.6vh;
  margin-bottom: 1vh;
`;

const Label = styled.label`
  font-size: 1.5vh;
  font-weight: bold;
  margin-bottom: 0.5vh;
  display: block;
`;

const UniformBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5vh;
  padding: 2vh 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
`;

const UniformColor = styled.div`
  display: flex;
  align-items: center;
  gap: 1vh;
`;

const UniformLabel = styled.span`
  font-size: 1.4vh;
  font-weight: 500;
  margin-right: 0.5vh;
`;

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

      const userRes = await fetch(`http://52.78.12.127:8080/api/teams/${teamId}/users-in-team`);
      setTeamUser(await userRes.json());
    };

    fetchTeam();
  }, [teamId]);

  useEffect(() => {
    setTeam(prev => ({
      ...prev,
      teamName,
      location,
      firstColor,
      secondColor,
    }))
  }, [teamName, location, firstColor, secondColor])

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setLogoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setLogo(reader.result);
    reader.readAsDataURL(file);
  };

  if (!team) return <div className="text-center py-10">로딩 중...</div>;

  return (
    <Container>
      {/* 팀 프로필 */}
      <Row>
        <label>
          <ImagePreview src={logo} onError={(e) => (e.target.src = altImage)} />
          <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
        </label>

        <div className="flex-1">
          <Label>팀명</Label>
          <Input value={teamName} onChange={(e) => setTeamName(e.target.value)} />
          <Label>위치</Label>
          <Input value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
      </Row>

      {/* 유니폼 색상 */}
      <UniformBox>
        <UniformColor>
          <UniformLabel>HOME</UniformLabel>
          <UniformIcon color={firstColor} size="30px" />
          <input type="color" value={firstColor} onChange={(e) => setFirstColor(e.target.value)} className="w-10 h-6 border cursor-pointer" />
        </UniformColor>

        <UniformColor>
          <UniformLabel>AWAY</UniformLabel>
          <UniformIcon color={secondColor} size="30px" />
          <input type="color" value={secondColor} onChange={(e) => setSecondColor(e.target.value)} className="w-10 h-6 border cursor-pointer" />
        </UniformColor>
      </UniformBox>
    </Container>
  );
};

export default TeamUpdate;
