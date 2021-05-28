import { useCallback } from 'react';
import styled from 'styled-components';
import { SearchBar } from '../components/SearchBar';
import { Colors } from '../style/Colors';

type HomeProps = {
  onSubmit: (value: string) => void;
};

const Home: React.FC<HomeProps> = ({ onSubmit }) => {
  const handleSearch = useCallback(
    (query: string): void => {
      return onSubmit(query);
    },
    [onSubmit]
  );

  return (
    <Container>
      <SearchBar onSubmit={handleSearch} />
    </Container>
  );
};

/*
 * Styles
 */

export const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  background-color: ${Colors.GREY_300};
`;

export default Home;
