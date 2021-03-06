var express = require('express');
var morgan = require('morgan');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var path = require('path');
var bodyParser=require('body-parser');

var config={
    user:'kamalhotwani3',
    database:'kamalhotwani3',
    host:'db.imad.hasura-app.io',
    port: '5432',
    password : 'db-kamalhotwani3-62089'
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

function createTemplate(data)
{
var title=data.title;
var date=data.date;
var content=data.content;
var HTMLTemplate=
`
<html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        
    </head>
    <body>
    <div class="container">
        <div><a href='/'>Home</a></div>
        <hr/>
        <div >
            ${date.toDateString()}
        </div>
        <div>
 ${content}
        </div>
        </div>
    </body>
</html>
`;
return HTMLTemplate;
}

var pool=new Pool(config); 
app.get('/test-db', function (req, res) {
    pool.query('Select * from Test',function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
        }
        
    });
});

var counter=0;
app.get('/counter', function (req, res) {
    counter=counter+1;
    res.send(counter.toString());
});
var names=[];
app.get('/submit-name', function (req, res) {
    var name=req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

app.get('/articles/:contentname', function (req, res) {
    var contentname=req.params.contentname;
    pool.query("select * from article where title=$1",[req.params.contentname],function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            if(result.rows.length===0){
                res.status(404).send('Article Not Found');
            }else{
            var articleData=result.rows[0];
            res.send(createTemplate(articleData));
        }}
    });
});

function hash(input,salt){
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return hashed.toString('hex');
}


app.post('/create-user', function (req, res) {
    var username=req.body.username;
    var password=req.body.password;
    var salt= crypto.randomBytes(128).toString('hex');
    var dbString= hash(password,salt);
    pool.query('insert into "user_login" (user_name,password) values ($1,$2)' , [username,dbString],function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send('User Successfully created'+username);
            }
    });
});

app.get('/hash/:input', function (req, res) {
  var hashString=hash(req.params.input,'random-string');
  res.send(hashString);
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
