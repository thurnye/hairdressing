//this is the server controller where i do send data to the back end....
const User = require('../Model/userModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6; // tell bcrypt how many times to randomize the generation of salt. usually 6 is enough.



//Creating A User
const postCreateUser = async (req, res, next) => {
    try {
        const hashedPassword = req.body.password && await bcrypt.hash(req.body.password, SALT_ROUNDS)
    
        const newUser = new User ({
            firstName: req.body.firstName,
            fastName: req.body.lastName,
            password: hashedPassword,
            googleId: req.body.googleId,
            email: req.body.email,
            imageUrl: req.body.imageUrl
        })
        
        const user = await newUser.save()
        console.log(user)
        const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
        res.status(200).json(token)
    } catch (err) {
        res.status(400).json(err)
    }
}

// Login a User
const getLogin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) throw  Object.assign(
            new Error(),
            { message: 'No account found!.' }
         );
        // check password. if it's bad throw an error.
        if (!(await bcrypt.compare(req.body.password, user.password))) throw  Object.assign(
            new Error(),
            { message: 'Invalid email or password!.' }
         );

        // if we got to this line, password is ok. give user a new token.
        const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
        res.json(token)
    } catch (err) {
        res.status(422).json(err);
    }
}


// User validation check
const getAUser= async (req, res, next) => {
    try {
        const query = {}
        const type = req.params.type;
        const value = req.params.value;
        query[type] = value
        console.log(query)
        const user = await User.find(query)
        if(user[0]){
            const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
            res.status(200).json(token)
        }else{
            res.status(204).json({
                message: 'No User Found!'
            }) 
        }
    } catch (error) {
        res.status(400).json(error)
    }
   
}



// //  GETTING A USER TO EDIT
// const getEdit = (req, res, next) => {
//     const id = req.params.id;
//     User.findById(id)
//     .then(data => {
//         res.send({data})
//     })
//     .catch(err => res.status(400).json(err))
// }

// // POSTING UPDATED USER INFO
// const postEdit = (req, res, next) => {
//     const id = req.body.id;
//     User.findById(id)
//     .then(user => {
//         user.FirstName = req.body.firstName;
//         user.LastName = req.body.lastName;
//         user.Address = req.body.address;
//         user.Number = req.body.number;
//         user.Email = req.body.email;
//         return user.save()
//     })
//     .then((user) => {
//         // send a response to the front end
//         res.status(200).json(user)
//     })
//     .catch(err => res.status(400).json(err));
// }

// //DELETING A USER
// const postDelete = async (req, res, next) => {
//     const id = req.params.id;
//     console.log(id)
//     await User.findByIdAndDelete(id)
//     .then(result => {
//         console.log(result)
//           res.status(200).json(result)
//       })
//     .catch(err => res.status(400).json(err))
// }

module.exports = {
    postCreateUser,
    getLogin,
    getAUser,
    // getEdit,
    // postEdit, 
    // postDelete
}