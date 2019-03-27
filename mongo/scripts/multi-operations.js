load('/scripts/utils.js')

const [...itemRange] = range(10);
itemRange.forEach(x => {
  db.multi.insert({things: [x, x+1, x+2]});
});

printjson(db.multi.find().toArray());

// By default, the option is set to only one record
db.multi.update({}, {$push: {things: 100}});
printjson(db.multi.find().toArray());

db.multi.update({}, {$push: {things: 100}}, {multi: true});
printjson(db.multi.find().toArray());

printjson(db.multi.find({things: 2}).toArray());
db.multi.update({things: 2}, {$push: {things: 1000}}, {multi: true});
printjson(db.multi.find({things: 2}).toArray());

