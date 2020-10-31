const { io } = require('../server');
const {Users} = require ('../classes/users')

const users = new Users()

io.on('connection', (client, callback) => {

    client.on('enterChat', (data, callback) => { 
        console.log('user conected', data)
        if (!data.name) {
            return callback({
                error: true,
                message: 'necesary name'
            })
        }

        let usersOnChat = users.addPerson(client.id, data.name)
        callback(usersOnChat)
    })



  

});