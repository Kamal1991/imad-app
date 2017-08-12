var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var content1={
    title:'kamal-1 | Kamal Hot',
    heading : 'Article one',
    date: 'Aug 12,2017',
    content:`            
    <p> COntent of kamal-1. COntent of kamal-1.  COntent of kamal-1.  COntent of kamal-1.  COntent of kamal-1.  COntent of kamal-1.  COntent of kamal-1.  COntent of kamal-1.  COntent of kamal-1.  COntent of kamal-1.  COntent of kamal-1.  COntent of kamal-1.  COntent of kamal-1.  COntent of kamal-1.  COntent of kamal-1. vvvvvvvv COntent of kamal-1.  COntent of kamal-1.            
    </p>
    <p> COntent of kamal-1.  COntent of kamal-1.  COntent of kamal-1.  COntent of kamal-1.  COntent of kamal-1.  COntent of kamal-1.  COntent of kamal-1.  COntent of kamal-1.  COntent of kamal-1.  COntent of kamal-1.  COntent of kamal-1.  COntent of kamal-1.  COntent of kamal-1.  COntent of kamal-1.  COntent of kamal-1.  COntent of kamal-1.  COntent of kamal-1.  COntent of kamal-1.  COntent of kamal-1.  COntent of kamal-1. 
    </p>`
};
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
        <div><a href='/'>Home</a></div>
        <hr/>
        <div>
            ${date}
        </div>
        <div>
 ${content}
        </div>
    </body>
</html>
`;
return htmlTemplate;
}


app.get('/kamal-1', function (req, res) {
  res.send(createTemplate(content1));
});

app.get('/kamal-2', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'kamal-2.html'));
});

app.get('/kamal-3', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'kamal-3.html'));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
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
