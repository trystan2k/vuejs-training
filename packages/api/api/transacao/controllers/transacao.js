'use strict';

const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  /**
   * Retrieve records.
   *
   * @return {Array}
   */

  async find(ctx) {

    const tipo = ctx.query.tipo || 'comprador_id';
    const entities = await strapi.services.transacao.find({ [tipo]: ctx.state.user.username, _sort: 'created_at:desc'});

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.transacao }));
  },

};
