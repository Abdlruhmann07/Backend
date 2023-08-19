const handleErrors = (err) => {
    let errors = { email: '', password: '' }
    console.log(err.message, err.code);

    // Incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'incorrect email'
    }

    // Incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'incorrect password'
    }
    //Unique email error handling
    if (err.code === 11000) {
        errors.email = 'That email is already registered'
        return errors;
    }

    // validation errors
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            console.log(properties);
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

module.exports = handleErrors;