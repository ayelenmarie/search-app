import { useCallback } from 'react';
import { SearchBar } from '../components/SearchBar';

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
    <>
      <SearchBar onSubmit={handleSearch} />
    </>
  );
};

export default Home;
