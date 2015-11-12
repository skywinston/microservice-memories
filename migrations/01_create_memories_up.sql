DROP TABLE if exists memories;
CREATE TABLE memories (
  id serial primary key,
  old_days varchar(140),
  these_days varchar(140),
  year numeric
)
