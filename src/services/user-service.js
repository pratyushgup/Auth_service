const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserRepository = require('../repository/user-repository');

const { JWT_KEY } = require('../config/serverConfig');

class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }

    createToken(user){
        try {
            const result = jwt.sign(user,JWT_KEY,{expiresIn:'1d'});
            return result;
        } catch (error) {
            console.log("Something went wrong in creating token in service layer");
            throw error;
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in creating token in service layer");
            throw error;
        }
    }

    async signIn(email,plainPassword){
        try {
            //step-1 Fetch the user using the email
            const user = await this.userRepository.getByEmail(email);
            //step-2 compare incoming plain password with stored encrypted password
            const passwordMatch = this.checkPassword(plainPassword,user.password);
            if(!passwordMatch){
                console.log("Password does'nt match");
                throw {error:'Incorrect password'};
            }
            //step-3 If passwords match then create a token and send it to the user
            const newJWT = this.createToken({
                email:user.email,
                id:user.id
            });
            return newJWT;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }

    checkPassword(userInputPlainPassword,encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in creating token in service layer");
            throw error;
        }
    }
}

module.exports = UserService;