class Users { 
    constructor() { 
        this.personsInRoom = []
    }

    addPerson(id, name, room) { 
        let person = { id, name, room }
        this.personsInRoom.push(person)
        return this.personsInRoom
    }
    getPerson(id) { 
        let person = this.personsInRoom.filter(thePerson => thePerson.id === id)[0]
        return person
    }
    getAllPersons() {
        return this.personsInRoom
    }
    getPersonsRoom(room) {
        let personsInRoom = this.personsInRoom.filter(person => person.room === room)
        
        return personsInRoom
    }
    removePerson(id) { 
        let removedPerson = this.getPerson(id)
        
        this.personsInRoom = this.personsInRoom.filter(personToRemove => personToRemove.id != id)

        return removedPerson
    }

}

module.exports = { Users }