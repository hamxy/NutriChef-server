
// err.code does exist on "unique" property

/**
 * 
 * @param {*} err 
 * @returns 
 * 
 * Returns object with email and pasword error messages:
 * email errors: user exixsts or string is not a valid email
 * password error: password contains less than 6 characters
 */
const authErrors = (err) => {
    let errors = { email: "", password: ""};

    // check if email is already registered
    if (err.code === 11000){
        errors.email = "That email is already registered"
        return errors
    }

    // check if email and password errors exist
    if (typeof err.errors !== "undefined"){
        if ("email" in err.errors){
            errors.email = err.errors.email.message;
        }
        if ("password" in err.errors){
            errors.password = err.errors.password.message;
        }
    }
    
    return errors;
}

module.exports = authErrors