const axios = require('axios');
const _ = require('lodash');

const author = {
  name: 'Ayelen',
  lastname: 'Guini',
};

exports.getItems = (query) => {
  return axios
    .get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4`)
    .then((response) => {
      const filteredCategories = _.filter(response.data.available_filters, {
        id: 'category',
      });
      const categories = filteredCategories[0].values;
      const items = response.data.results.map((item) => {
        return {
          id: item.id,
          title: item.title,
          price: {
            currency: item.currency_id,
            amount: Math.floor(item.price),
            decimals: item.price % 1,
          },
          picture: item.thumbnail,
          condition: item.condition,
          freeShipping: item.shipping.free_shipping,
          location: item.address.state_name,
        };
      });

      return {
        author,
        categories,
        items,
      };
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};

exports.getItemDetails = async (query) => {
  const firstRequest = axios.get(`https://api.mercadolibre.com/items/${query}`);
  const secondRequest = axios.get(
    `https://api.mercadolibre.com/items/${query}/description`
  );

  try {
    const responses = await Promise.all([firstRequest, secondRequest]);
    const [item, description] = responses;

    const itemDetails = {
      id: item.data.id,
      title: item.data.title,
      price: {
        currency: item.data.currency_id,
        amount: Math.floor(item.data.price),
        decimals: item.data.price % 1,
      },
      picture: item.data.pictures[0].url,
      condition: item.data.condition,
      freeShipping: item.data.shipping.free_shipping,
      soldQuantity: item.data.sold_quantity,
      description: description.data.plain_text,
    };

    return {
      author,
      itemDetails,
    };
  } catch (error) {
    console.log(error);
  }
};
