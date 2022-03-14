// importing dotenv package to retrieve environmental vars.
require('dotenv').config();
const mongo = require('mongoose');

// environmental variables list.
const dbUser = process.env.db_name;
const dbCluster = process.env.db_cluster;
const dbPass = process.env.db_pswd;
const dbDatabase = process.env.db_db;

// establish a connection to mongoDB cluster.
mongo.connect(`mongodb+srv://${dbUser}:${dbPass}@${dbCluster}/${dbDatabase}?retryWrites=true&w=majority`)
  .then((data) => {
    console.log('Database connected! ☕');
    module.exports = data;
  }).catch((err) => console.error(err));
