const createNew = async (reqBody) => {
    try {
        const newNote = {
            ...reqBody
        }
        return newNote
    } catch (err) {
        throw err
    }
}

module.exports = {
    noteServices: {
        createNew
    }
}