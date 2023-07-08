const errorHandler = () => {
  return (err, req, res, next) => {
    console.log(err);


  }
}

module.exports = errorHandler;