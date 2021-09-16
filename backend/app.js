const express = require("express");
const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');
const path = require("path");
const jwt = require("jsonwebtoken")

const User = require("./models/user");
const Post = require('./models/post');
const checkAuth = require('../backend/middleware/checkAuth');

const multer = require("multer");

const app = express();

mongoose
  .connect(
    'mongodb://localhost:27017/Blog'
  )
  .then(() => {
    console.log("Connected to Blog Db!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});


var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'backend/images');
  },
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});
var fileFilter = function(req, file, cb){
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
  cb(null, true);
} else {
  cb(new Error('file must be in png format'), false);
}
};
var upload = multer({storage: storage, limits: {
  fileSize: 1024 * 1024
},
fileFilter: fileFilter
});


app.post("/add", upload.single('image'), (req, res, next) => {
 console.log(req.file);
 console.log(req.body)
  var post = new Post({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    content: req.body.content,
   author: req.body.author,
   image: "images/" + req.file.filename

  }); post
    .save()
    .then(createdPost => {
      console.log(createdPost.image)
      res.status(201).json({
        message: "Post added successfully",
        createdPost: createdPost
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a post failed!"
      });
    });
});


app.get("/getPost", (req, res, next) => {
  Post.find({status: 'approved'}).then(documents => {
    res.status(200).json({
      Posts: documents
    });
  });
});



//DELETE OPERATION
app.delete("/delete/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(
    documents => {
      res.status(201).json({
        Message: 'Post removed'
      })
});
});



app.post("/signup", (req, res, next) => {
  User.find({email: req.body.email})
  .exec()
  .then(user => {
    if(user.length >= 1) {
       res.status(409).json({
        Message: 'Mail exist.'
      });
    } else {
      bcryptjs.hash(req.body.password, 10, (err, hash) => {
        if (err) {
        return  res.status(500).json({
            error: err
          });
        } else {
          var user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: hash,

          });
          user.save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              Message: 'User successfully added.'
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            })
          });
        }
      });
    }
  })

})



app.post("/login", (req, res, next) => {
  User.find({email: req.body.email})
  .exec()
  .then(user => {
    if (user.length < 1){
      return res.status(401).json({
        Error: 'Auth Failed.'

      });
    }
    bcryptjs.compare(req.body.password, user[0].password, (err, result) => {
      if (err){
        return res.status(401).json({
          Error: 'Auth Failed.'
        });
      }
      if (result) {
        var JWT_KEY = 'secret';
        var token = jwt.sign({
          email: user[0].email,
          userId: user[0]._id
        },
        JWT_KEY,
        {
          expiresIn: '1h'
        }
      );
        return res.status(200).json({
          Message: 'Auth Successful.',
          token: token,
          id: user[0]._id
        });
      }
      res.status(401).json({
        Error: 'Auth Failed.'
      });
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  })
});




app.get('/:userId', (req, res, next) => {
  console.log(req.params.userId)
  var id = req.params.userId;
  Post.find({author:id}).select('_id title content image author status')
  .exec()
  .then(doc => {
    console.log(doc);
    if (doc) {
      res.status(200).json({
        doc: doc
      });
    } else {
      res.status(404).json({
        error: 'No Records found for that ID'
      })
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  });
})







module.exports = app;
