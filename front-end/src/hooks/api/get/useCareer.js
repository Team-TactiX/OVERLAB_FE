import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const useCareer = () => {
  const { userId } = useParams();
  const [careerList, setCareerList] = useState([]);

  useEffect(() => {
    const fetchCareerList = async () => {
      const careerListResponse = await fetch(
        `http://52.78.12.127:8080/api/users/files/career/user/${userId}`,
      );
      const careerListData = await careerListResponse.json();
      setCareerList(careerListData);
    };

    fetchCareerList();
  }, [userId]);

  return { careerList };
};

export default useCareer;
