var express = require("express"),
    app = new express();

app.set('view engine', 'ejs');

app.use(express.bodyParser());
app.use(express.methodOverride());

var posts = [];

app.get("/posts/:id", function(req, res){
  var post_id = parseInt(req.params['id']);
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
});

app.put("/posts/:id", function(req, res){
  var post_id = parseInt(req.params['id']);
  if (post_id && post_id >= 0 && post_id < posts.length){
     res.render("view_post", {id: post_id, post: posts[post_id]});
    if (req.body['title'] && req.body['body']){
      var new_post = {
        title: req.body['title'],
        body: req.body['body']
      };
      posts[post_id] = new_post;
      res.redirect(req.url);
    } else {
      res.send(400);
    }
  } else {
    res.send(404);
  }
});

app.delete("/posts/:id", function(req, res){
  var post_id = parseInt(req.params['id']);
  if (post_id && post_id >= 0 && post_id < posts.length){
    posts.splice(post_id, 1); //splice is a pretty good indie game
    res.send(200);
  } else {
    res.send(404);
  }
});

app.get("/", function(req, res){
   res.render("view_posts", {posts: posts});
});

app.listen(8080);
