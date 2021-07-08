function routeNotFound(req, res, next) {
  res.status(404).json({ message: "Requested route not found" });
}

module.exports = { routeNotFound };
