function admin(req, res, next) {
  console.log(req.user.roleId);
  if (req.user.roleId >= 4) {
    return next();
  }
  res.send("Not allowed");
}
function editor(req, res, next) {
  if (req.user.roleId >= 3) {
    return next();
  }
  res.send("Not allowed");
}
function writer(req, res, next) {
  if (req.user.roleId >= 2) {
    return next();
  }
  res.send("Not allowed");
}
function reader(req, res, next) {
  if (req.user.roleId >= 1) {
    return next();
  }
  res.send("Not allowed");
}
module.exports = {
  admin,
  editor,
  writer,
  reader,
};
