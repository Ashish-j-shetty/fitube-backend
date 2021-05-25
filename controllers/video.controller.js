const getVideos = async (req, res) => {
  res.send("welcome to video router");
};

const addVideos = async (req, res) => {
  const data = req.body;

  res.send({ data });
};

module.exports = { getVideos, addVideos };
