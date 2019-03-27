load('/scripts/utils.js')

// const itemRange = [...range(10)]
// itemRange.forEach(x => {
//     db.monkeypunch.insert({x:x});
// });

printjson(db.monkeypunch.find().toArray());

printjson(
  db.monkeypunch.findAndModify({
    query: {x: 6},
    update: {"$set": {y: 5}}
  }));

printjson(db.monkeypunch.findOne({x: 6}));
