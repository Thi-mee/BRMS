const logger = (req, res, next) => {
  console.log("\x1b[33m%s\x1b[0m", `${req.method} ${req.path}`);
  console.log("\x1b[36m%s\x1b[0m", `query: ${JSON.stringify(req.query)}`);
  console.log("\x1b[36m%s\x1b[0m", `body: ${JSON.stringify(req.body)}`);
  next();
};


module.exports = logger;