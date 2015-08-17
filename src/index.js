import knex from 'knex';
import { partial } from 'ramda';

function queryFactory(orm, table) {
  const query = {};

  query.select = (columnArray, distinct) => {
    return distinct ?
      orm.distinct.apply(undefined, columnArray).from(table) :
      orm.select.apply(undefined, columnArray).from(table);
  };

  query.insert = (insertArray) => {
    return orm.insert(insertArray).into(table);
  };

  query.update = (updatesObj) => {
    return orm.update(updatesObj).table(table);
  };

  query.delete = (queryArray) => {
    return queryArray ?
      queryArray.reduce((seq, data) => { return seq.orWhere(data); }, orm)
        .del().from(table) :
      orm.del().from(table);
  };

  return query;
}

export function Factory(options) {
  const adapter = {};

  adapter.connect = () => {
    const orm = knex(options);

    adapter.query = partial(adapter.query, orm);
    adapter.close = partial(adapter.close, orm);

    return adapter;
  };

  adapter.query = (orm, table) => {
    return queryFactory(orm, table);
  };

  adapter.close = (orm) => {
    orm.client.pool.end();
  };

  return adapter;
}
