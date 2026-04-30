const UserService = require('../services/user.service');

class AuthController {
  static async login(req, res, next) {
    const { email, password } = req.body;
    const result = await UserService.login(email, password);
    return result; 
  }
}

module.exports = AuthController;