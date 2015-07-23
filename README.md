# jupiter-orm-sql

Sql adapter for Jupiter-orm.

## Install

In CLI:
```bash
npm i --save jupiter-orm-sql
```

In your code:
```javascript
import jupiterOrm from 'jupiter-orm';
import jupiterOrmSql frin 'jupiter-orm-sql';

jupiterOrm.typeRegister('psql', jupiterOrmSql);
```

## API

### Constructor

#### .Fabric()

Return new object API

### ORM Object

`jupiter-orm-sql` is a extended [knex.js](https://github.com/tgriesser/knex)
library, for single runtime of `jupiter` modlues family.

All methods of `knex.js` there is in `jupiter-orm-sql`.

