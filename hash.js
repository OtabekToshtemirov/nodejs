const bcrypt = require('bcrypt')
const password = '123456'

async function hashPassword() {
    const salt =await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword)
}

hashPassword()
