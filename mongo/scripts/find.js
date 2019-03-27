load('/scripts/utils.js')

db = db.getSiblingDB('demo')

printjson(db.books.find(
  {title: 'Unlocking Android'},
  {title: 1, status: ''}
).toArray())

// gt, lt, gte, lte
printjson(db.books.find(
  {pageCount: {$gt:500}},
  {title: 1, pageCount: 1}
).toArray())

// range
printjson(db.books.find(
  {pageCount: {$gt:500, $lt:550}},
  {title: 1, pageCount: 1}
).toArray())

// negation
printjson(db.books.find(
  {pageCount: {$not: {$gt:500}}},
  {title: 1, pageCount: 1}
).toArray())

// in, nin is not in
printjson(db.books.find(
  {pageCount: {$in: [425, 600]}},
  {title: 1, pageCount: 1}
).sort({pageCount: -1}).toArray())

// arrays
printjson(db.books.find(
  {authors: 'Jeffery Hicks'},
  {authors: 1}
).toArray())

printjson(db.books.find(
  {authors: {$in: ['Jeffery Hicks', 'Don Jones']}},
  {authors: 1}
).toArray())

printjson(db.books.find(
  {authors: {$all: ['Jeffery Hicks', 'Don Jones']}},
  {authors: 1}
).toArray());

// sub documents must use dot notation
db.books.update({_id: 591}, {$set: {subdoc: {field1: 1, field2: 2}}});
db.books.update({_id: 777}, {$set: {subdoc: {field1: null, field2: 2}}});
printjson(db.books.findOne({_id:591}, {subdoc: 1}));

// in project, 1 is include, 0 is exclude
// id must be explicitly excluded, it is the only field that behaves like this
printjson(db.books.find(
  {"subdoc.field1": {$exists: true}, "title": "PowerShell in Depth"},
  {title: 1}
).toArray());

// mongo uses lazy evaluated cursors
let cursor = db.books.find();
print(`There are ${cursor.size()} books!`);
print(`Does the cursor have another document?: ${cursor.hasNext()}`);

while(cursor.hasNext())
  print(cursor.next().title);

printjson(db.books.find(
  {},
  {_id: 0, title: 1, pageCount: 1})
  .sort({pageCount: -1, title: -1})
  .toArray());

// limit and skip are useful for paging
printjson(db.books.find(
  {},
  {_id: 0, title: 1, pageCount: 1})
  .sort({pageCount: -1, title: -1})
  .limit(3)
  .toArray());

printjson(db.books.find(
  {},
  {_id: 0, title: 1, pageCount: 1})
  .sort({pageCount: -1, title: -1})
  .skip(3)
  .limit(3)
  .toArray());
