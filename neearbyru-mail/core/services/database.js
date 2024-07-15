const knex = require('knex');
const { database } = require('../../secret/config');
const { attachPaginate } = require('knex-paginate');

const db = knex(database);

attachPaginate();

module.exports = db;
