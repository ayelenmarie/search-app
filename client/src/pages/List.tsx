import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { SearchBar } from '../components/SearchBar';

type ItemsListResponse = {
  author: any;
  items: any[];
  categories: any[];
  dataRaw: any;
};

const List = () => {
  const { query } = useParams<{ query: string }>();
  const [itemsList, setItemsList] = useState<any>();
  console.log('LA QUERY', query);

  const getItemsList = useCallback((query: string) => {
    fetch(`http://localhost:8080/api/items?q=${query}`)
      .then((res) => {
        try {
          return res.json() as unknown as ItemsListResponse;
        } catch (error) {
          console.log('Error happened here!');
          console.error(error);
        }
      })
      .then((res) => {
        setItemsList(res?.items);
      });
  }, []);

  useEffect(() => {
    getItemsList(query);
  }, [query, getItemsList]);

  const handleSearch = useCallback(
    (value) => {
      // App request here
      getItemsList(value);
    },
    [getItemsList]
  );

  console.log('LA LISTA', itemsList);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
    </>
  );
};

export default List;
