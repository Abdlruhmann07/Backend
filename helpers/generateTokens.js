const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'dodger secret dodger', {
        expiresIn: maxAge
    });
}

module.exports = { maxAge, createToken };