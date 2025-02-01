const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DB_CONNECTION_URL.replace(
  '<db_password>',
  process.env.DB_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('DB Connection Successfull !!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at port = ${port}`);
});
