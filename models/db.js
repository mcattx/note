const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // fix mysql timezone problem
  timezone: 'Asia/Shanghai'
})

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});

sequelize.sync()
  .then(() => User.create({
    username: 'mcattx',
    birthday: new Date(1991, 8 ,28)
  }))
  .then(jane => {
    console.log(jane.toJSON());
  })