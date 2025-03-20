'use strict';

/**
 * utterance service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::utterance.utterance');
