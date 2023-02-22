let express = require('express');
let app = express();
let morgan = require('morgan');
let dotenv = require('dotenv');
dotenv.config();
let port = process.env.PORT || 7800;
let mongo = require('mongodb');
let cors = require('cors')
let MongoClient = mongo.MongoClient;
let bodyParser = require('body-parser')
let mongoUrl = 'mongodb+srv://trial321:trial321@atlascluster.kpsc2.mongodb.net/Relief?retryWrites=true&w=majority';
let db;

app.use(morgan('common'))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('Hiii From Express')
})


app.get('/suppliers',(req,res) => {
    db.collection('supply').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

app.post('/addnew',(req,res) => {
    db.collection('supply').insert(req.body, (err,result) => {
        if(err) throw err;
        res.send('New Supplier Added')
    })
})


// connection with db
MongoClient.connect(mongoUrl,(err,client) =>{
    if(err) console.log(`Error While Connecting`);
    db = client.db('Relief');
    app.listen(port,() => {
        console.log(`listening on port ${port}`)
    })
})
