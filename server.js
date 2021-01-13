const express = require("express");
const nunjucks = require("nunjucks");

const server = express();
const videos = require("./data");

server.use(express.static("public"));

server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true,
});

server.get("/", function (req, res) {
  const about = {
    avatar_url:
      "https://avatars2.githubusercontent.com/u/74993246?s=460&u=b31cce90b8f7572455abc3597f0a930b5393a10c&v=4",
    name: "Dgeison S. Peixoto",
    role: "Aluno ",
    description:
      'Aluno do curso full-stack da <a href="http://rocketseat.com.br" target="_blank">RocketSeat</a>.',
    link: [
      { name: "Github", url: "https://github.com/dgeison/" },
      { name: "Twitter", url: "https://twitter.com/dgeisonpeixoto/" },
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/dgeison-peixoto-70761319/",
      },
    ],
  };
  return res.render("about", { about }); //about:about
});

server.get("/portfolio", function (req, res) {
  return res.render("portfolio", { items: videos });
});

server.get("/video", function (req, res) {
  const id = req.query.id;

  const video = videos.find(function (video) {
    return video.id == id

  });

  if (!video) {
    return res.send("Video not found!");
  }

  return res.render("video", { item: video });
});

server.listen(5000, function () {
  console.log("Server is running!");
});
