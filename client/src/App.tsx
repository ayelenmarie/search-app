import { useCallback } from 'react';
import { SearchBar } from './components/SearchBar';

const App: React.FC = () => {
  const handleSearch = useCallback((value) => {
    console.log('CLICK!', value);
  }, []);
  return (
    <>
      <SearchBar onClick={handleSearch} />
    </>
  );
};

export default App;
