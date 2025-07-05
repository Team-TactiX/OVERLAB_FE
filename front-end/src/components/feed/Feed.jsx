import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Feed = ({ onLoaded }) => {
  const { contentId } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/community/${contentId}`);
        if (!res.ok) throw new Error('게시글 불러오기 실패');
        const data = await res.json();
        onLoaded(data);
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };

    fetchPost();
  }, [contentId, onLoaded]);

  return null;
};

export default Feed;
