const { io } = require('../server');
const { Users } = require('../classes/users')
const { createMessage } = require ('../utils/utils')

const users = new Users()

io.on('connection', (client) => {

    client.on('enterChat', (data, callback) => { 

        if (!data.name || !data.room) {
            return callback({
                error: true,
                message: 'necesary name'
            })
        }

        client.join(data.room)

        let usersOnChat = users.addPerson(client.id, data.name, data.room)

        client.broadcast.to(data.room).emit('personList', users.getPersonsRoom(data.room))

        callback(usersOnChat)
    })
    //SENDING MESSAGES TO ALL USERS
    client.on('createMessage', (data) => {
        let person = users.getPerson(client.id)

        let message = createMessage(person.name, data.message)
        client.broadcast.to(person.room).emit('createMessage', message)
    })

    //CLIENT ON DISCONNECT
    client.on('disconnect', () => { 
        
        let removedPerson = users.removePerson(client.id)

        client.broadcast.to(removedPerson.room).emit('creteMessage', createMessage('Administrator', `${removedPerson.name} has left`))
        client.broadcast.to(removedPerson.room).emit('personList', users.getPersonsRoom(removedPerson.room))
    })

    //PRIVATE MESSAGES
    client.on('privateMessage', data => { 
        let person = users.getPerson(client.id)
        client.broadcast.to(data.toUser).emit('privateMessage', createMessage(person.name, data.message))

    })

    

});