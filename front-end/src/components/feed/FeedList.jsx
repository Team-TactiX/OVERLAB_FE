import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FeedCard from './FeedCard';

const FeedList = ({ category }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const res = await fetch(
          `http://52.78.12.127:8080/api/community/category?category=${encodeURIComponent(
            category,
          )}`,
        );
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error('커뮤니티 불러오기 실패:', err);
      }
    };

    fetchCommunity();
  }, [category]);

  return (
    <>
      {posts.map((post) => (
        <FeedCard
          key={post.contentId}
          post={post}
          onClick={() => navigate(`/feed/${post.contentId}`)}
        />
      ))}
    </>
  );
};

export default FeedList;
