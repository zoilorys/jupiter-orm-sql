## Jupiter-ORM-SQL
[![Build Status](https://travis-ci.org/zoilorys/jupiter-orm-sql.svg?branch=master)](https://travis-ci.org/zoilorys/jupiter-orm-sql) [![Coverage Status](https://coveralls.io/repos/zoilorys/jupiter-orm-sql/badge.svg?branch=master&service=github)](https://coveralls.io/github/zoilorys/jupiter-orm-sql?branch=master) [![Code Climate](https://codeclimate.com/github/zoilorys/jupiter-orm-sql/badges/gpa.svg)](https://codeclimate.com/github/zoilorys/jupiter-orm-sql)

SQL ORM based on [knex.js](http://knexjs.org/). Query API object support all of [knex.js](http://knexjs.org/) query builder modifier functions, that you can chain to its [.select()](), [.insert()](), [.update()]() and [.delete()]() functions, e.g. [.join()](http://knexjs.org/#Builder-join), [.where()](http://knexjs.org/#Builder-where), etc.
###### Note : examples provided for *mysql* module, but adapter supports all modules supported by knex.js. Click [here](http://knexjs.org/#Installation-node) for more info.

## API

### .Factory(options)

Returns object with adapter API.

#### **Arguments**
* options - { Object } - object with connection settings, e.g. :

```javascript
let options = {
  client : 'mysql',
  connection : {
    host : 'localhost',
    user : 'user',
    password : 'password',
    database : 'test'
  }
};
```

#### **Example**

``` javascript
const orm = Factory({
  // options
});

```

### .connect()

Establishes connection to DB. Returns adapter object.

#### **Example**

```javascript
const orm = Factory({
  // options
}).connect();

// or

const orm = Factory({
  // options
});
orm.connect();
```

### .close()

Closes current connection.

#### **Example**

```javascript
const orm = Factory({
  // options
}).connect();

// do something

orm.close();
```

### .query(tableName)

Returns query API object for chosen table in DB.

#### **Arguments**
* tableName - { String } - name of table to query.

#### **Example**

```javascript
const orm = Factory({
  // options
}).connect().query('test') // ...
```

## Query API

### .select([columnNamesArray], distinct)

Search DB for data. Returns Promise.

#### **Arguments**
* columnNamesArray - { Array } - array of column names to query, e.g.: `['id', 'name']`;
* distinct - { Boolean } - if set to `true`, returns results without duplicates.

#### **Example**

```javascript
const orm = Factory({
  // options
}).connect()
  .query('test')
  .select(['id', 'name'], false)
  .then(function(result) {
    doSomethingWith(result);
  });
```

### .insert([insertArray])

Insert data in DB table. Returns Promise with resolved value of id of 1st inserted item of array, or array of id's for *postgres* module.

#### **Arguments**
* insertArray - { Array } - array of objects to insert into DB, where keys correspond to column names, e.g. `{ id : 1, name : 'user' }`.

#### **Example**

```javascript
const orm = Factory({
  // options
}).connect()
  .query('test')
  .insert([
    { id : 1, name : 'user1' },
    { id : 2, name : 'user2' }
  ])
  .then(function(id) {
    // ...
  });
```

### .update(updateObj)

Updates data in DB table. Returns Promise with resolved number of updated entries.
###### Note : you should specify data to update with knex's where() functions. Go [here](http://knexjs.org/#Builder-where) for more details.

#### **Arguments**
* updatesObj - { Object } - object, that have keys as column names with updated values for them.

#### **Example**

```javascript
const orm = Factory({
  // options
}).connect()
  .query('test')
  .update([
    { name : 'updated_user1' },
  ])
  .where({ id :1 })
  .then(function(num) {
    // ...
  });
```

### .delete(queryArray)

Deletes entries from DB. Returns Promise with resolved number of deleted entries.

#### **Arguments**
* queryArray - { Array } - array of where clause objects, to specify target for deletion.

#### **Example**

```javascript
const orm = Factory({
  // options
}).connect()
  .query('test')
  .delete() // all entries will be deleted
  .then(function(num) {
    // ...
  });
```
