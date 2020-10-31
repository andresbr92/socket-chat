const { io } = require('../server');
const { Users } = require('../classes/users')
const { createMessage } = require ('../utils/utils')

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
    client.on('createMessage', (data) => {
        let person = users.getPerson(client.id)

        let message = createMessage(person.name, data.message)
        client.broadcast.emit('createMessage', message)
    })


    client.on('disconnect', () => { 
        
        let removedPerson = users.removePerson(client.id)

        client.broadcast.emit('creteMessage', createMessage('Administrator', `${removedPerson.name} has left`))
        client.broadcast.emit('personList', users.getAllPersons())
    })

    

});