const { sanitizeEntity, parseMultipartData } = require('strapi-utils');

module.exports = {

  /**
   * Retrieve records.
   *
   * @return {Array}
   */

  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.produto.search(ctx.query);
    } else {
      entities = await strapi.services.produto.find(ctx.query);
    }

    ctx.set('X-Total-Count', await strapi.services.produto.count());

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.produto }));
  },

  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.services.produto.findOne({ slug });
    return sanitizeEntity(entity, { model: strapi.models.produto });
  },

  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      data.author = ctx.state.user.id;
      entity = await strapi.services.produto.create(data, { files });
    } else {
      ctx.request.body.author = ctx.state.user.id;
      entity = await strapi.services.produto.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.produto });
  },

  /**
   * Update a record.
   *
   * @return {Object}
   */
  async update(ctx) {
    const { id: slug } = ctx.params;

    let entity;

    const [produto] = await strapi.services.produto.find({
      slug,
    });

    if (produto && produto.author.id !== ctx.state.user.id) {
      return ctx.unauthorized(`You can't update this entry`);
    }

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.produto.update({ slug }, data, { files });
    } else {
      entity = await strapi.services.produto.update({ slug }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.produto });
  },

  /**
   * Delete a record.
   *
   * @return {Object}
   */

  async delete(ctx) {
    const { id: slug } = ctx.params;

    const [produto] = await strapi.services.produto.find({
      slug,
    });

    if (produto && produto.author.id !== ctx.state.user.id) {
      return ctx.unauthorized(`You can't delete this entry`);
    }

    const [entity] = await strapi.services.produto.delete({ slug });

    //with strapi multiple media
    if(entity && entity.fotos && entity.fotos.length > 0){
      entity.fotos.forEach(image => {
        strapi.plugins.upload.services.upload.remove(image);
      });
    }

    return sanitizeEntity(entity, { model: strapi.models.produto });
  },
};
