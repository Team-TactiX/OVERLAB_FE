const QuarterDelete = ({ quarterId }) => {
  const handleDeleteGame = async () => {
    const confirmDelete = window.confirm('정말로 경기를 삭제할까요?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        'http://52.78.12.127:8080/api/quarters/delete-quarter',
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quarterId: Number(quarterId) }),
        },
      );

      if (res.ok) {
        alert('삭제 완료');
        window.location.reload();
      } else {
        const error = await res.text();
        alert('삭제 실패: ' + error);
      }
    } catch (err) {
      console.error(err);
      alert('서버 오류');
    }
  };

  return (
    <button
      onClick={() => handleDeleteGame()}
      className="w-full max-w-[360px] bg-red-100 text-red-600 font-semibold py-[1.2vh] rounded-full hover:bg-red-200"
    >
      🗑 쿼터 삭제
    </button>
  );
};

export default QuarterDelete;
