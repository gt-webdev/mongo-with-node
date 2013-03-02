var express = require("express"),
    app = new express();

var mongo = require('mongodb');
var ObjectId = mongo.ObjectID;
 
var Server = mongo.Server,
   Db = mongo.Db;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('blogs', server);

db.open(function(err){
  if (err) throw new Error("antonnny is a noob");
});

app.set('view engine', 'ejs');

app.use(express.bodyParser());
app.use(express.methodOverride());

var posts = [];

app.get("/posts/:id", function(req, res){
  var post_id = req.params['id'];
  console.log(post_id);
  if (post_id){
    db.collection('posts', function(err, coll){
      coll.findOne({_id:new ObjectId(post_id)}, function(err, post ){
        res.render("view_post", {id: post_id, post: post});
      });
    });
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
    db.collection('posts', function(err, coll){
      coll.insert(new_post, function(err){
        res.redirect('/');
      });
    });
  } else {
    res.send(400);
  }
});

app.put("/posts/:id", function(req, res){
  var post_id = req.params['id'];
  if (post_id){
    if (req.body['title'] && req.body['body']){
      var new_post = {
        title: req.body['title'],
        body: req.body['body']
      };
      db.collection('posts', function(err, coll){
        coll.update({_id:ObjectId(post_id)},new_post, function(err){
      res.redirect(req.url);
        });
      });
    } else {
      res.send(400);
    }
  } else {
    res.send(404);
  }
});

app.delete("/posts/:id", function(req, res){
  var post_id = req.params['id'];
  if(post_id){
    db.collection('posts', function(err, coll){
      coll.remove({_id:new ObjectId(post_id)}, function(err){
        res.redirect('/');
      });
    });
  } else {
    res.send(404);
  }
});

app.get("/", function(req, res){
  db.collection('posts', function(err, coll){
    coll.find({},function(err, cursor){
      cursor.toArray(function(err, arr){
        res.render("view_posts", {posts: arr});
      });
    });
  });
});

app.listen(8080);
