const axios = require('axios');
const _ = require('lodash');

const author = {
  name: 'Ayelen',
  lastname: 'Guini',
};

exports.getItems = (query) => {
  return axios
    .get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`)
    .then((response) => {
      console.log('LA RESPONSE', response.data);
      const dataRaw = response.data;
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
          free_shipping: item.shipping.free_shipping,
        };
      });

      return {
        author,
        dataRaw,
        categories,
        items,
      };
    });
};

exports.getItemDetails = (query) => {
  axios
    .get(`https://api.mercadolibre.com/items/​​​:${query}/description`)
    .then((response) => {
      // handle success
      return response;
    });
};
