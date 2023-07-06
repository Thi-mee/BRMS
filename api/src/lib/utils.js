const {v4: uuidv4} = require('uuid')

const generateUniqueId = () => {
    return uuidv4().slice(0, 10);
}

const generateCode = (name) => {
    return `LOC-${name.slice(0, 3)}-${new Date().toISOString()}`
}


module.exports = {
    generateCode,
    generateUniqueId
}