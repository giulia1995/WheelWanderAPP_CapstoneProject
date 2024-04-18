// Middleware function to validate user input before proceeding to the next middleware or route handler
const validateAdminBody = (req, res, next) => {
    const errors = []; // Array to hold validation errors
  
    // Destructure user input from request body
    const { firstName, lastName, email, password } = req.body;
  
    // Validate first name: must be a string
    if (typeof firstName !== "string") {
      errors.push("firstName must be a string");
    }
  
    // Validate last name: must be a string
    if (typeof lastName !== "string") {
      errors.push("lastName must be a string");
    }
  
    // Validate email: must be in a valid email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      errors.push("please insert a valid email!");
    }
  
    // Validate password: must be a string with minimum 4 characters
    if (typeof password !== "string" || password.length < 4){
      errors.push ("Password must be a string with min 4 char")
    }
  
    // If there are validation errors, send a 400 response with the errors
    if (errors.length > 0){
      res.status(400).send({ errors })
    } else {
      // If no errors, proceed to the next middleware or route handler
      next()
    }
  };
  
  
  module.exports = validateAdminBody;