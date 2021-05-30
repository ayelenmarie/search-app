import { isEmpty } from 'lodash';

import { ItemType, Item } from './Item';
import styled from 'styled-components';
import { Colors } from '../style/Colors';

type ListProps = {
  items: ItemType[];
};

const List: React.FC<ListProps> = ({ items }) => {
  const hasItems = !isEmpty(items);
  return (
    <ContentContainer>
      {hasItems &&
        items?.map((item: any, id: number) => {
          return <Item item={item} key={id} />;
        })}
    </ContentContainer>
  );
};

/*
 * Styles
 */

const ContentContainer = styled.div`
  background-color: ${Colors.WHITE};
  padding: 16px;
`;

export default List;
