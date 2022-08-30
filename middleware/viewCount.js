let count = 0;

const viewCount = (req, res, next) => {
  count++;
  //   console.log(count);

  //   res.send("count found");
  next();
};

module.exports = viewCount;
