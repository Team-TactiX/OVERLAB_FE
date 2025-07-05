import styled from 'styled-components';
import Calender from '../../components/schedule/Calender';

const Container = styled.div`
  padding: 8vh 2vh 3vh;
  background-color: #fafafa;
`;

const Title = styled.h2`
  font-size: 2.4vh;
  font-weight: 600;
  margin-bottom: 2vh;
  border-bottom: 2px solid #ddd;
  display: inline-block;
`;

const CalenderPage = () => {
  return (
    <Container>
      <Title>전체 일정</Title>
      <Calender />
    </Container>
  );
};

export default CalenderPage;
