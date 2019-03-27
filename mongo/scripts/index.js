db = db.getSiblingDB('demo')


// db.books.dropIndex('title_1')
// printjson(db.books.find({title: 'Hibernate in Action'}).explain())
db.books.ensureIndex({title: 1})
printjson(db.books.find({title: 'Hibernate in Action'}).explain())
//
// printjson(db.books.aggregate([
//   {$unwind: "$isbn"},
//   { $group: {
//     _id: "$isbn",
//     count: { $sum: 1 }
//   }}
// ]).toArray())

// db.books.ensureIndex({status: 1})
// printjson(db.books.aggregate([
//   {
//     $group: { _id: "$status", count: { $sum: 1 } }
//   }
// ]).toArray())

// printjson(db.books.find({status: 'MEAP'}).explain())
