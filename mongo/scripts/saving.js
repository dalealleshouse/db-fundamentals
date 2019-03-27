// db.foo.save({_id: ObjectId(), x: 10});
// db.bar.save({_id: 1, x: 10});
// db.foo.find();

const id = ObjectId()
const query = {
  _id: id
};

function clog() {
  printjson(db.demo.findOne(query));
}

// Bad - not thread safe
db.demo.save({_id: id, x: 10});

var doc = db.demo.findOne(query);
doc.x = doc.x + 1;
db.demo.save(doc);
clog();

// Better, atomic within document
db.demo.update(query, {$inc: {x: 1}});
clog();

db.demo.update(query, {$set: {y: 1}});
clog();

db.demo.update(query, {$set: {y: 10}});
clog();

db.demo.update(query, {$unset: {y: ''}});
clog();

db.demo.update(query, {$rename: {x: 'monkeyPunch'}});
clog();

// Array Operators
db.demo.update(query, {$push: {things: 'one'}});
clog();

db.demo.update(query, {$push: {things: 'two'}});
db.demo.update(query, {$push: {things: 'three'}});
db.demo.update(query, {$push: {things: 'four'}});
clog();

db.demo.update(query, {$push: {things: 'two'}});
clog();

db.demo.update(query, {$addToSet: {things: 'two'}});
clog();

db.demo.update(query, {$pull: {things: 'two'}});
clog();

db.demo.update(query, {$pop: {things: -1}});
clog();
