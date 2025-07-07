import Comment from "./Comment";
import CommentCreate from "./CommentCreate";

const CommentList = ({ videoRef }) => {
  const commentes = [
    {
      id: 1,
      author: '김민지',
      content: '정말 유익한 게시글이네요! 감사합니다 😊',
      createdAt: '2025-07-06T15:30:00',
    },
    {
      id: 2,
      author: '이준호',
      content: '0:10 이 부분은 조금 더 설명이 필요할 것 같아요.',
      createdAt: '2025-07-06T16:10:00',
    },
    {
      id: 3,
      author: '박지현',
      content: '공감합니다! 팀원들과 공유했어요 💬',
      createdAt: '2025-07-07T08:45:00',
    },
  ];

  return (
    <div className="mt-4">
      <CommentCreate />
      <h3 className="text-md font-semibold mb-2">댓글 리스트</h3>
      <ul className="space-y-2">
        {commentes.map(comment => (
          <Comment key={comment.id} comment={comment} videoRef={videoRef} />
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
