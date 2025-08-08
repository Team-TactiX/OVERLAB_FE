import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const baseURL = import.meta.env.VITE_API_BASE_URL;

const useCareer = () => {
  const { userId } = useParams();
  const [careerList, setCareerList] = useState([]);

  useEffect(() => {
    const fetchCareerList = async () => {
      const careerListResponse = await fetch(
        `${baseURL}/api/users/files/career/user/${userId}`,
      );
      const careerListData = await careerListResponse.json();
      setCareerList(careerListData);
    };

    fetchCareerList();
  }, [userId]);

  return { careerList };
};

export default useCareer;
