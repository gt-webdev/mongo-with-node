var express = require("express"),
    app = new express();

app.set('view engine', 'ejs');

app.use(express.bodyParser());
app.use(express.methodOverride());

var posts = [];

app.get("/posts/:id", function(req, res){
  var post_id = parseInt(req.params['id']);
  console.log(post_id);
  if (post_id >= 0 && post_id < posts.length){
     res.render("view_post", {id: post_id, post: posts[post_id]});
  } else {
    res.send(404);
  }
});

app.post("/posts", function(req, res){
  if (req.body['title'] && req.body['body']){
    var new_post = {
      title: req.body['title'],
      body: req.body['body']
    };
    posts.push(new_post);
    res.redirect(req.url);
  } else {
    res.send(400);
  }
  console.log(posts);
});

app.put("/posts/:id", function(req, res){
});

app.delete("/posts/:id", function(req, res){
});

app.listen(8080);
