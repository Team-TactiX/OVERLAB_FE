import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import formations from '../../data/formation.json';
import tactics from '../../data/tactic.json';

const Lib_LIST = [
  { key: 'formation', label: 'Formation Lib.' },
  { key: 'tactics', label: 'Tactics Lib.' },
];

const LibPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialLib = searchParams.get('lib') || 'formation';
  const [activeLib, setActiveLib] = useState(initialLib);

  const handleLibChange = (key) => {
    setActiveLib(key);
    setSearchParams({ lib: key });
  };

  useEffect(() => {
    const lib = searchParams.get('lib') || 'formation';
    setActiveLib(lib);
  }, [searchParams]);

  return (
    <div className="pt-[10vh] px-6 md:px-10 pb-[3vh] bg-gray-50 min-h-screen">
      <div className="flex justify-center gap-8 mb-8 overflow-x-auto no-scrollbar">
        {Lib_LIST.map((lib) => (
          <button
            key={lib.key}
            onClick={() => handleLibChange(lib.key)}
            className={`min-w-[5rem] text-center whitespace-nowrap text-base font-medium focus:outline-none
                ${
                  activeLib === lib.key
                    ? 'text-green-600 border-b-2 border-green-500 pb-1'
                    : 'text-gray-400 hover:text-green-500'
                }`}
          >
            {lib.label}
          </button>
        ))}
      </div>

      {/* 탭 내용 */}
      <div className="max-w-4xl mx-auto">
        {activeLib === 'formation' && (
          <>
            {formations.map((form) => (
              <div
                key={form.id}
                onClick={() => navigate(`/lib/detail/formation/${form.id}`)}
                className="bg-white rounded-xl p-6 mb-6 shadow cursor-pointer hover:scale-[1.02] transition-transform"
              >
                <p className="text-gray-600 text-sm mb-2">{form.summation}</p>
                <h3 className="text-lg font-bold mb-3">{form.title}</h3>
                <img
                  src={form.img}
                  alt={form.title}
                  className="w-full rounded-lg object-cover"
                />
              </div>
            ))}
          </>
        )}

        {activeLib === 'tactics' && (
          <>
            {tactics.map((tactic) => (
              <div
                key={tactic.id}
                onClick={() => navigate(`/lib/detail/tactic/${tactic.id}`)}
                className="bg-white rounded-xl p-6 mb-6 shadow cursor-pointer hover:scale-[1.02] transition-transform"
              >
                <h3 className="text-lg font-bold mb-2">{tactic.title}</h3>
                <p className="text-gray-600 text-sm">{tactic.summation}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default LibPage;
