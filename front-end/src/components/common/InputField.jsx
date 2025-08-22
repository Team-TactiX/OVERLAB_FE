const InputField = ({
  label,
  type = 'text',
  value,
  placeholder,
  onChange,
  onClear,
  error,
}) => {
  // 에러 유무에 따라 input 태그의 ring(테두리 강조) 스타일을 동적으로 결정
  const ringClass = error
    ? 'ring-2 ring-red-500' // 에러가 있으면 빨간색 테두리
    : 'focus:ring-2 focus:ring-green-500'; // 에러가 없으면 포커스 시 초록색 테두리

  return (
    <div className="flex flex-col">
      <label className="mb-1 text-base text-gray-600">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={`w-full h-11 px-4 text-base bg-gray-50 rounded-lg focus:outline-none ${ringClass}`}
        />
        {/* value가 존재할 때만 'x' 버튼 표시 */}
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        )}
      </div>
      {/* error 메시지가 존재할 때만 p 태그를 표시 */}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default InputField;
