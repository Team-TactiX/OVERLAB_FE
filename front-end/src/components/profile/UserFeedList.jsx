import { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserFeed from './UserFeed';
import { useParams } from 'react-router-dom';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2vh;
  justify-items: center;
  width: 100%;
`;

const UserFeedList = () => {
  const [userFeedList, setUserFeedList] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `http://52.78.12.127:8080/api/users/files/player/user/${userId}`,
      );
      const data = await res.json();
      setUserFeedList(data);
    };
    fetchData();
  }, [userId]);

  return (
    <GridContainer>
      {userFeedList.map((userFeed) => (
        <UserFeed key={userFeed.fileId} userFeed={userFeed} />
      ))}
    </GridContainer>
  );
};

export default UserFeedList;
