const express = require('express');
const bodyParser = require('body-parser');

const { PORT } =require('./config/serverConfig');

const apiRoutes = require('./routes/index');
// const UserService = require('./services/user-service');
const db = require('./models/index');


const app = express();
const prepareAndStartServer = () =>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);

    app.listen(PORT,async() =>{
        
        console.log(`Server started at ${PORT} `);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter: true});
        }

        // const service = new UserService();
        // const newToken = service.createToken({email:'pg0623733@gmail.com',id:1});
        // console.log(newToken);
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBnMDYyMzczM0BnbWFpbC5jb20iLCJpZCI6MSwiaWF0IM0LCJleHAiOjE2NzI1MTYyMzR9.Ob5yJ3diyN0TUSS7tiPFKCFjsQlynaj_tNyTdTbVhKA'
        // const response = service.verifyToken(token);
        // console.log(response);

    })
}

prepareAndStartServer(); 
