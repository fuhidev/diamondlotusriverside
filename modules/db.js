const { Client, Pool } = require('pg')
const config = {
  host: 'ditagis.com',
  port: 5432,
  user: 'postgres',
  password: 'ditagis@2017',
  database: 'test'
};
const client = new Client(config);
client.connect();
var sendEmail = function (email) {
  return new Promise((resolve, reject) => {
    let time = new Date().getTime();
    let query = `INSERT INTO contact(email,thoigian)VALUES ('${email}',CURRENT_TIMESTAMP);`

    client.query(query)
      .then(res => {
        resolve(res)
      })
      .catch(e => {console.log(e); reject(e) })
  });
}
exports.sendEmail = sendEmail;
