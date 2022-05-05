const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      let {username, password} = req.body

      for(let i = 0; i < users.length; i++) {

      if(users[i].username === username) {
        
        let validate = bcrypt.compareSync(users[i].passwordHash = password)
        if(validate) {
          let userReturned = {...users[i]}
          delete userReturned.passwordHash
          res.status(200).send(userReturned)
      }
    }
  } 
  res.status(400).send('no user detected')
},
    register: (req, res) => {
        let{username, email, firstname, lastname, password} = req.body
        let salt = bcrypt.genSaltSync(5)
        let passwordHash = bcrypt.hashSync(password, salt)

        let user = {
          username,
          email,
          firstname,
          lastname,
          passwordHash
        }

        users.push(user)
        let newUser = {...user}
        delete newUser.passwordHash
        res.status(200).send(newUser)
    }
}