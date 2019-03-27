var userCount = function() {
  var count = db.Users.count();
  var entry = {_id: Date(), n: count};
  db.UserCountHistory.save(entry);
  print("Today's User Count: " + entry.n);
}

userCount();
