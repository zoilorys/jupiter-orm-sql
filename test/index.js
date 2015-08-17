import { expect } from 'chai';

import { Factory } from '../src';

const options = {
  client : 'mysql',
  connection : {
    host : 'localhost',
    user : 'test_user',
    password : 'password',
    database : 'test_orm'
  }
};

describe('API specs', () => {
  it('ORM adapter should have API functions', () => {
    const orm = Factory(options);

    expect(orm).to.have.all.keys('connect', 'query', 'close');

    [
      orm.connect,
      orm.query,
      orm.close
    ].forEach(func => {
      expect(func).to.be.ok.and.to.be.a('function');
    });
  });

  it('Query object should have API functions', () => {
    const query = Factory(options).query();

    expect(query).to.have.all.keys('select', 'insert', 'update', 'delete');

    [
      query.select,
      query.insert,
      query.update,
      query.delete
    ].forEach(func => {
      expect(func).to.be.ok.and.to.be.a('function');
    });
  });
});

describe('CRUD operations', () => {
  const orm = Factory(options);

  before(() => {
    orm.connect();
  });

  it('insert() should insert data to table', (done) => {
    orm.query('test').insert([
      { id : 1, name : 'user1' },
      { id : 2, name : 'user2' }
    ]).then(result => {
      expect(result).to.be.eql([0]);
      done();
    });
  });

  it('update() should update data in table', (done) => {
    orm.query('test').update({ name : 'updated' }).where({ id : 2 }).then(result => {
      expect(result).to.be.ok.and.to.be.eql(1);
      done();
    });
  });

  it('select() should get data from table', (done) => {
    orm.query('test').select(['name'], false).then(result => {
      expect(result).to.be.ok.and.to.be.eql([
        { name : 'user1' },
        { name : 'updated' }
      ]);
      done();
    });
  });

  it('delete() should delete data from table', (done) => {
    orm.query('test').delete([{ id : 1 }, { id : 2 }]).then(result => {
      expect(result).to.be.ok.and.to.be.eql(2);
      done();
    });
  });
});
