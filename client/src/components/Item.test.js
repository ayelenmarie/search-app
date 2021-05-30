import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Item } from './Item';

const ItemContent = {
  id: 'MLA916025694',
  title: 'Nintendo Switch 32gb Standard Color Rojo Neón, Azul Neón Y Negro',
  condition: 'Nuevo',
  description:
    'Con tu consola Switch tendrás entretenimiento asegurado todos los días. Su tecnología fue creada para poner nuevos retos tanto a jugadores principiantes como expertos. \n\nSwitch se convirtió en una de las consolas más versátiles del mercado gracias a su uso portátil y de sobremesa. Nintendo desarrolló este modelo con el objetivo de tener todas las comodidades de la tecnología de elite en un aparato portátil con el que podrás jugar y disfrutar de diverso contenido online.\n\nNintendo Switch es una consola desmontable, que puede usarse en modo portátil, sobremesa o en la TV; esto te brindará la posibilidad de utilizarla donde quieras y compartir sus controles.\n\nLos Joy-con cuentan con botones especiales para realizar print de pantalla. Además, posee una cámara infrarroja que puede leer la distancia respecto a los objetos e incluso detectar formas.\n\nAdaptada a tus necesidades\nGuardá tus apps, fotos, videos y mucho más en el disco duro, que cuenta con una capacidad de 32 GB.\nPor otro lado, tiene puerto USB y salida HDMI, que permiten conectar accesorios y cargar la batería de tu control mientras jugás.\n\nVas a poder reproducir música, ver tus películas y series favoritas a través de las aplicaciones descargables.',
  freeShipping: true,
  picture: 'http://http2.mlstatic.com/D_883371-MLA32731749246_112019-O.jpg',
  price: { currency: 'ARS', amount: 75999, decimals: 0.05000000000291038 },
  amount: 75999,
  currency: 'ARS',
  decimals: 0.05000000000291038,
  soldQuantity: 5,
};

beforeEach(() =>
  render(
    <BrowserRouter>
      <Item item={ItemContent} />
    </BrowserRouter>
  )
);

describe('Item', () => {
  it('Should have Title', () => {
    expect(
      screen.getByText(
        'Nintendo Switch 32gb Standard Color Rojo Neón, Azul Neón Y Negro'
      )
    ).toBeInTheDocument();
  });

  it('Should have Price', () => {
    expect(screen.getByTestId('Price')).toHaveTextContent('$ 75.999');
  });

  it('Should have an item picture', () => {
    expect(
      screen.getByAltText(
        'Nintendo Switch 32gb Standard Color Rojo Neón, Azul Neón Y Negro'
      )
    ).toBeInTheDocument();
  });
});
