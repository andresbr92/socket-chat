const { io } = require('../server');
const {Users} = require ('../classes/users')

const users = new Users()

io.on('connection', (client) => {

    client.on('enterChat', (data, callback) => { 
       // console.log('user conected', data)
        if (!data.name) {
            return callback({
                error: true,
                message: 'necesary name'
            })
        }

        let usersOnChat = users.addPerson(client.id, data.name)

        client.broadcast.emit('personList', users.getAllPersons())

        callback(usersOnChat)
    })


    client.on('disconnect', () => { 
        
        let removedPerson = users.removePerson(client.id)

        client.broadcast.emit('creteMessage', {user:'Administrator', message: `${removedPerson.name} has left the room`})
        client.broadcast.emit('personList', users.getAllPersons())
    })

    

});