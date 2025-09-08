const TeamJoin = () => {
  const handleJoin = async () => {
    const teamId = sessionStorage.getItem('teamId');
    const userMail = sessionStorage.getItem('userMail');

    if (!teamId || !userMail) return alert('정보 누락');

    try {
      const res = await fetch(
        `http://52.78.12.127:8080/api/teams/${teamId}/add-user`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userMail }),
        },
      );

      if (res.ok) {
        alert('팀 가입 완료!');
        window.location.reload();
      } else {
        alert(`가입 실패: ${await res.text()}`);
      }
    } catch (err) {
      console.error(err);
      alert('서버 오류');
    }
  };

  return (
    <button
      onClick={handleJoin}
      className="bg-black text-white w-full h-[6vh] text-[2vh] rounded-[0.7vh] mt-[3vh] cursor-pointer"
    >
      팀 가입하기
    </button>
  );
};

export default TeamJoin;
