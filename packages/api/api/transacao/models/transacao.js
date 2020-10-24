'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async afterCreate(result) {
      await strapi.services.produto.vendido({ slug: result.produto.slug });
    },
    async beforeCreate(data) {
      data.produto.vendido = 'true';
    }
  }
};
