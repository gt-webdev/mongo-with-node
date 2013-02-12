var express = require("express"),
    app = new express();

app.use(express.bodyParser());
app.use(express.methodOverride());
