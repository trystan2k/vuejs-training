'use strict';

const slugify = require('slugify');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  /**
   * Promise to add record
   *
   * @return {Promise}
   */

  async create(data, { files } = {}) {
    const validData = await strapi.entityValidator.validateEntityCreation(strapi.models.produto, data);
    const entry = await strapi.query('produto').create(validData);
    const slug = `${slugify(entry.nome)}-${entry.id}`;
    const newEntry = await strapi.query('produto').update({id: entry.id}, { slug: slug.toLowerCase()});

    if (files) {
      // automatically uploads the files based on the entry and the model
      await strapi.entityService.uploadFiles(newEntry, files, {
        model: 'produto',
        // if you are using a plugin's model you will have to add the `source` key (source: 'users-permissions')
      });
      return this.findOne({ id: newEntry.id });
    }

    return newEntry;
  },

  async vendido(params) {
    const entity = await strapi.query('produto').findOne(params);
    console.log('entity', entity)
    if (entity) {
      strapi.query('produto').update({ id: entity.id }, {
        vendido: 'true'
      });
    }
  }
};
