const mySql = require('mysql');
const con = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'demo_project_api'
});

con.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Database Connection done');
    }
})

module.exports = con;