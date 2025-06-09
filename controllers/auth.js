 const User = require('../models/user'); // Changed variable name to uppercase
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// REGISTER
exports.Register = async function(req, res) {
    const {name, email, password} = req.body;
    
    if(!name || !email || !password) {
        return res.status(400).json({message: "All fields are required"});
    }

    try {
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(409).json({message: "User already exists"}); // 409 Conflict
        }

        const newUser = new User({name, email, password});
        await newUser.save();
        
        // Generate token for immediate login after registration
        //const token = jwt.sign(
          //  {id: newUser._id},
         //   process.env.JWT_SECRET, // Fixed typo
         //   {expiresIn: '1h'}
      //  );
        
        return res.status(201).json({
            message: "User registered successfully",
          //  token
        });

    } catch(error) {
        console.error("Registration error:", error);
        return res.status(500).json({message: "Error occurred during registration"});
    }
}

// LOGIN
exports.login = async function(req, res) {
    const {email, password} = req.body;
    
    if(!email || !password) {
        return res.status(400).json({message: "Please fill all fields"});
    }

    try {
        const foundUser = await User.findOne({email}) ; // Need to select password
        
        if(!foundUser) {
            return res.status(401).json({message: "Invalid credentials"}); // 401 Unauthorized
        }

        const isMatch = await bcrypt.compare(password, foundUser.password);
        if(!isMatch) {
            return res.status(401).json({message: "Invalid credentials"});
        }

        const token = jwt.sign(
            {id: foundUser._id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );
        
        return res.json({
            message: "Login successful",
            token
        });

    } catch(error) {
        console.error("Login error:", error);
        return res.status(500).json({message: "Error occurred during login"});
    }
}