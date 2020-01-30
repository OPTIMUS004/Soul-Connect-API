const mongoose = require('mongoose');                           // Makes an instance of mongoose package

if (process.env.ENV === 'Test') {
  console.log('This is a test');
  mongoose.connect('mongodb://localhost/_Test',
      { useNewUrlParser: true, 
        useUnifiedTopology: true 
      });                               
}else{
        mongoose.connect('mongodb://localhost/soulconnect_Users',
        { 
          useNewUrlParser: true, 
          useUnifiedTopology: true 
        }, (err) => {
          if (!err){

            console.log('Server Connected to MAIN DataBase');
          }else{
            console.log('Error connecting server to DataBase: ' + JSON.stringify(err, undefined, 2));
          }
        });
};

module.exports = mongoose;

