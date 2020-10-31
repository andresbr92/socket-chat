class Users { 
    constructor() { 
        this.personsInRoom = []
    }

    addPerson(id, name) { 
        let person = { id, name }
        this.personsInRoom.push(person)
        return this.personsInRoom
    }
    getPerson(id) { 
        let person = this.personsInRoom.filter(person => person.id === id[0])
        return person
    }
    getAllPersons() {
        return this.personsInRoom
    }
    getPersonsRoom(room) {
        //...
    }
    removePerson(id) { 
        let removedPerson = this.getPerson(id)

        this.personsInRoom = this.personsInRoom.filter(personToRemove => personToRemove.id != id)

        return removedPerson
    }

}

module.exports = { Users }