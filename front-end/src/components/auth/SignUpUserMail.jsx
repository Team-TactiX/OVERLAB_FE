import useCheckUserMail from '../../hooks/api/get/useCheckUserMail';

const SignUpUserMail = ({ value, onChange, onNext }) => {
  const { checkUserMail } = useCheckUserMail({ onNext });

  return (
    <form className="mx-auto w-full max-w-[288px] mt-[4vh] flex flex-col gap-[20px]">
      <div className="relative flex flex-col">
        <label className="text-[16px] text-[#6F6F6F] mb-[5px]">이메일</label>
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-[42px] bg-[#FAFAFA] rounded-[10px] px-4 text-[15px] focus:outline-green-500"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-3 top-[35px] text-gray-400 hover:text-gray-600 text-[18px] font-bold"
          >
            ×
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={() => checkUserMail(value)}
        className="w-full h-[42px] bg-[#00B140] rounded-[10px] text-white font-semibold text-[15px] hover:opacity-90"
      >
        계속
      </button>
    </form>
  );
};

export default SignUpUserMail;
