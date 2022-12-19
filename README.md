# psql commands
```
psql -U postgres
```

### Connect to the Database
```
\c DATABASE_NAME
```

### Create a Table
```
create table account ( account_id integer, account_name text, balance numeric );
```
```
alter table account add primary key ( account_id );
```
### To Check the Table Description
```
\d TABLE_NAME
```

