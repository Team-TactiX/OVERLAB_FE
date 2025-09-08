import { useParams, useNavigate } from 'react-router-dom';
import formations from '../../data/formation.json';
import tactics from '../../data/tactic.json';
import backImg from '../../img/back.png';

const LibDetailPage = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const data =
    type === 'formation'
      ? formations.find((f) => String(f.id) === id)
      : tactics.find((t) => String(t.id) === id);

  if (!data) {
    return (
      // Container & Card 스타일 적용
      <div className="mt-[8vh] bg-gray-50 flex justify-center">
        <div className="w-full max-w-[60vh] bg-white rounded-xl p-[3vh] shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
          {/* Description 스타일 적용 */}
          <p className="text-[1.6vh] text-gray-600 leading-relaxed mb-[2vh]">
            {type === 'formation'
              ? '포메이션 정보를 찾을 수 없습니다.'
              : '전술 정보를 찾을 수 없습니다.'}
          </p>
        </div>
      </div>
    );
  }

  const renderMedia = () => {
    if (!data.img) return null;
    // mp4 동영상
    if (data.img.endsWith('.mp4')) {
      return (
        // MediaBox 스타일 적용
        <div className="w-full mb-[2vh]">
          <video
            src={data.img}
            controls
            className="w-full rounded-[1vh] mt-[2vh]"
          />
        </div>
      );
    }
    // 이미지
    if (
      data.img.endsWith('.jpg') ||
      data.img.endsWith('.png') ||
      data.img.endsWith('.jpeg') ||
      data.img.endsWith('.gif')
    ) {
      return (
        // MediaBox 스타일 적용
        <div className="w-full mb-[2vh]">
          <img
            src={data.img}
            alt={data.title}
            className="w-full rounded-[1vh] mt-[2vh]"
          />
        </div>
      );
    }
    // html 파일
    if (data.img.endsWith('.html')) {
      return (
        // MediaBox 스타일 적용
        <div className="w-full mb-[2vh]">
          <iframe
            src={data.img}
            title={data.title}
            className="w-full border-none rounded-[1vh] mt-[2vh]"
            style={{ minHeight: 'calc(min(100vw, 50vh) * 0.6)' }}
          />
        </div>
      );
    }
    return null;
  };

  return (
    // Container 스타일 적용
    <div className="mt-[8vh] bg-gray-50 flex justify-center">
      {/* Card 스타일 적용 */}
      <div className="w-full max-w-[60vh] bg-white rounded-xl p-[3vh] shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
        {/* BackRow 스타일 적용 */}
        <div className="flex items-center mb-[2vh] relative">
          {/* BackIcon 스타일 적용 */}
          <img
            src={backImg}
            alt="◀"
            onClick={() => navigate(-1)}
            className="w-[2.4vh] h-[2.4vh] cursor-pointer select-none absolute left-0 top-1/2 -translate-y-1/2"
          />
          {/* Title 스타일 적용 */}
          <h2 className="text-[2.4vh] font-bold mb-[1.5vh] text-center flex-1">
            {data.title}
          </h2>
        </div>
        {/* Summary 스타일 적용 */}
        <p className="text-[1.7vh] font-medium text-gray-800 text-center mb-[2vh]">
          {data.summation}
        </p>
        {/* Description 스타일 적용 */}
        <p className="text-[1.6vh] text-gray-600 leading-relaxed mb-[2vh]">
          {data.description1}
        </p>
        {renderMedia()}
        {/* Description 스타일 적용 */}
        <p className="text-[1.6vh] text-gray-600 leading-relaxed mb-[2vh]">
          {data.description2}
        </p>
      </div>
    </div>
  );
};

export default LibDetailPage;
