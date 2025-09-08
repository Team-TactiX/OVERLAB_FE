import { useState } from 'react';
import altImage from '../../img/alt_image.png';

const ALL_COLORS = [
  'red',
  'blue',
  'skyblue',
  'navy',
  'white',
  'black',
  'yellow',
  'orange',
  'green',
  'darkgreen',
  'maroon',
  'purple',
  'pink',
  'gray',
  'gold',
  'teal',
];

const TeamCreateModal = ({ onClose, onSuccess }) => {
  const userMail = sessionStorage.getItem('userMail');
  const [teamName, setTeamName] = useState('');
  const [location, setLocation] = useState('');
  const [logo, setLogo] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [homeColor, setHomeColor] = useState('red');
  const [awayColor, setAwayColor] = useState('black');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColorType, setSelectedColorType] = useState(null); // 'home' or 'away'

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setLogoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setLogo(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSelectPaletteColor = (color) => {
    if (selectedColorType === 'home') {
      setHomeColor(color);
    } else if (selectedColorType === 'away') {
      setAwayColor(color);
    }
    setShowColorPicker(false);
    setSelectedColorType(null);
  };

  const handleCreate = async () => {
    if (!teamName || !location) {
      alert('팀명과 위치는 필수입니다.');
      return;
    }

    if (homeColor === awayColor) {
      alert('두 유니폼 색상은 달라야 합니다.');
      return;
    }

    let userData;
    try {
      const response = await fetch(
        `http://52.78.12.127:8080/api/users/check/${userMail}`,
      );
      if (response.ok) {
        userData = await response.json();
      } else {
        alert(await response.text());
        return;
      }
    } catch (err) {
      console.error(err);
      alert('유저 정보 조회 실패');
      return;
    }

    let finalLogoFile = logoFile;
    if (!finalLogoFile) {
      try {
        const response = await fetch(altImage);
        const blob = await response.blob();
        finalLogoFile = new File([blob], 'default-logo.png', {
          type: blob.type,
        });
      } catch (err) {
        console.error(err);
        alert('기본 로고 파일 불러오기 실패');
        return;
      }
    }

    const newTeam = {
      teamManager: userData,
      teamName,
      location,
      firstColor: homeColor,
      secondColor: awayColor,
    };

    try {
      const formData = new FormData();
      formData.append(
        'team',
        new Blob([JSON.stringify(newTeam)], { type: 'application/json' }),
      );
      formData.append('logo', finalLogoFile);

      const response = await fetch(
        'http://52.78.12.127:8080/api/teams/create-team',
        {
          method: 'POST',
          body: formData,
        },
      );

      if (response.ok) {
        alert('팀 생성 완료!');
        onClose();
        if (onSuccess) onSuccess();
      } else {
        alert((await response.text()) || '팀 생성 실패');
      }
    } catch (error) {
      console.error('팀 생성 중 오류:', error);
      alert('서버 요청 중 문제가 발생했습니다.');
    }
  };

  return (
    // Overlay 스타일 적용
    <div
      className="fixed bottom-20 left-1/2 -translate-x-1/2 max-w-md
        bg-[#f4f4f4] rounded-t-[2vh] shadow-lg z-[1000]"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
        {/* Row 스타일 적용 */}
        <div className="flex items-center gap-[1vh]">
          <label>
            {/* ImagePreview 스타일 적용 */}
            <img
              src={logo || '/images/default-logo.png'}
              onError={(e) => {
                e.target.src = altImage;
              }}
              alt="team logo"
              className="w-[10vh] h-[10vh] rounded-full m-[2vh] object-cover"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </label>
          <div className="flex-1">
            {/* Input 스타일 적용 */}
            <input
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="text-[1.8vh] p-[1vh] m-[0.5vh] w-4/5 rounded-[1vh] border border-[#ccc]"
            />
            <input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="text-[1.8vh] p-[1vh] m-[0.5vh] w-4/5 rounded-[1vh] border border-[#ccc]"
            />
          </div>
        </div>
        {/* Row 스타일 적용 */}
        <div className="flex items-center gap-[1vh]">
          {/* ButtonBox 스타일 적용 */}
          <div className="flex justify-between w-11/12">
            {/* ColorBox 스타일 적용 */}
            <div className="flex justify-between w-1/4 items-center relative">
              <div>
                {/* ColorButton 스타일 적용 */}
                <button
                  onClick={() => {
                    setSelectedColorType('home');
                    setShowColorPicker(true);
                  }}
                  className={`ml-[2vh] mb-[2vh] w-[3vh] h-[3vh] rounded-full border-none opacity-100
                    ${homeColor === 'white' ? 'border border-black' : ''}`}
                  style={{ backgroundColor: homeColor }}
                />
              </div>
              <div>
                {/* ColorButton 스타일 적용 */}
                <button
                  onClick={() => {
                    setSelectedColorType('away');
                    setShowColorPicker(true);
                  }}
                  className={`ml-[2vh] mb-[2vh] w-[3vh] h-[3vh] rounded-full border-none opacity-100
                    ${awayColor === 'white' ? 'border border-black' : ''}`}
                  style={{ backgroundColor: awayColor }}
                />
              </div>
              {showColorPicker && (
                // ColorPalette 스타일 적용
                <div className="absolute bottom-[5.5vh] left-0 grid grid-cols-4 gap-[1vh] bg-white border border-[#ccc] p-[1vh] rounded-[1vh] z-[999]">
                  {ALL_COLORS.map((color) => (
                    // ColorOption 스타일 적용
                    <div
                      key={color}
                      className={`w-[3vh] h-[3vh] rounded-full cursor-pointer
                        ${color === 'white' ? 'border border-black' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleSelectPaletteColor(color)}
                    />
                  ))}
                </div>
              )}
            </div>
            {/* CreateButton 스타일 적용 */}
            <button
              onClick={handleCreate}
              className="ml-[2vh] mb-[2vh] h-[4.3vh] bg-black text-white text-[2vh] px-[2vh] border-none rounded-[1vh]"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCreateModal;
