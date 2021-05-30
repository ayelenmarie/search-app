import { useCallback, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import ClipLoader from 'react-spinners/ClipLoader';

import List from './components/List';
import ItemDetails from './pages/ItemDetails';
import { SearchBar } from './components/SearchBar';
import { Colors } from './style/Colors';
import { isEmpty } from 'lodash';
import { Error } from './components/Error';
import { Breadcrumb } from './components/Breadcrumb';

/*
 * Home App
 */

const App: React.FC = () => {
  let history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [itemsListResults, setItemsListResults] = useState<any>();

  const hasError = !isEmpty(itemsListResults?.error);
  const hasResults = !isEmpty(itemsListResults?.items);

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
      <ContentContainer>
        {loading ? (
          <LoadingContainer>
            <ClipLoader color={Colors.BLUE} loading={loading} size={150} />
          </LoadingContainer>
        ) : (
          <ListContainer>
            <Breadcrumb categories={itemsListResults.categories} />
            <Switch>
              <Route exact path="/items">
                {hasError ? (
                  <Error />
                ) : hasResults ? (
                  <List items={itemsListResults.items} />
                ) : (
                  <p>No hay resultados, probá buscando distinto!</p>
                )}
              </Route>
              <Route path="/items/:id" component={ItemDetails} />
            </Switch>
          </ListContainer>
        )}
      </ContentContainer>
    </Container>
  );
};

/*
 * Styles
 */

const Container = styled.div`
  background-color: ${Colors.GREY_300};

  @media (min-width: 650px) {
    height: 100vh;
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 48px 48px 48px;
`;

const ListContainer = styled.div`
  width: 70%;
`;

export default App;
