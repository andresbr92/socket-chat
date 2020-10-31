const { io } = require('../server');
const { Users } = require('../classes/users')
const { createMessage } = require ('../utils/utils')

const users = new Users()

io.on('connection', (client) => {

    client.on('enterChat', (data, callback) => { 
       // console.log('user conected', data)
        if (!data.name || !data.room) {
            return callback({
                error: true,
                message: 'necesary name'
            })
        }

        client.join(data.sala)

        let usersOnChat = users.addPerson(client.id, data.name, data.room)

        client.broadcast.emit('personList', users.getAllPersons())

        callback(usersOnChat)
    })
    //SENDING MESSAGES TO ALL USERS
    client.on('createMessage', (data) => {
        let person = users.getPerson(client.id)

        let message = createMessage(person.name, data.message)
        client.broadcast.emit('createMessage', message)
    })

    //CLIENT ON DISCONNECT
    client.on('disconnect', () => { 
        
        let removedPerson = users.removePerson(client.id)

        client.broadcast.emit('creteMessage', createMessage('Administrator', `${removedPerson.name} has left`))
        client.broadcast.emit('personList', users.getAllPersons())
    })

    //PRIVATE MESSAGES
    client.on('privateMessage', data => { 
        let person = users.getPerson(client.id)
        client.broadcast.to(data.toUser).emit('privateMessage', createMessage(person.name, data.message))

    })

    

});