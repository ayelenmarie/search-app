import { useCallback, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import List from './pages/List';
import ItemDetails from './pages/ItemDetails';
import { SearchBar } from './components/SearchBar';
import { Colors } from './style/Colors';
import { isEmpty } from 'lodash';

/*
 * Home App
 */

const App: React.FC = () => {
  let history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [itemsListResults, setItemsListResults] = useState<any>();

  const hasError = !isEmpty(itemsListResults?.error);
  const hasResults = !isEmpty(itemsListResults?.items);

  console.log(hasError);

  const getItemsListResults = useCallback(
    (query: string): any => {
      setLoading(true);
      fetch(`http://localhost:8080/api/items?q=${query}`)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          if (response.error) {
            console.error(response);
            setLoading(false);
            setItemsListResults(response);
          } else {
            setLoading(false);
            setItemsListResults(response);
            history.push(`/items?search=${query}`);
          }
        })
        .catch((error) => {
          setLoading(false);
          setItemsListResults(error);
        });
    },
    [history]
  );

  const handleSearch = useCallback(
    (query) => {
      return getItemsListResults(query);
    },
    [getItemsListResults]
  );

  return (
    <Container>
      <SearchBar onSubmit={(query: string) => handleSearch(query)} />
      {loading ? (
        <p>LOADING</p>
      ) : (
        <Switch>
          <Route exact path="/items">
            {hasError ? (
              <p>ERROR</p>
            ) : hasResults ? (
              <List items={itemsListResults.items} />
            ) : (
              <p>No hay resultados</p>
            )}
          </Route>
          <Route path="/items/:id" component={ItemDetails} />
        </Switch>
      )}
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

export default App;
