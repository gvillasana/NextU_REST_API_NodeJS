const express = require('express');
const app = express();

//settings
app.set('port', process.env.PORT || 8080);
app.set('json spaces', 2);

//middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use('/api/inmuebles', require('./routes/inmuebles'));

// starts the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
