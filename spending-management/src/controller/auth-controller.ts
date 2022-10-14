import bcrypt from "bcrypt";
import {User} from "../model/user";
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from "../middleware/auth";


class AuthController {
    register = async (req, res) => {

        let user = req.body;
        let checkUsername = await User.findOne({
            username: user.username
        });
        if (checkUsername) {
            res.status(403).json({
                message: 'tài khoản đã tồn tại!'
            })
        }else {
                user.password = await bcrypt.hash(user.password, 9);
                user = await User.create(user);
                res.status(201).json(user);
            }
    };

    async login(req, res) {
        let userForm = req.body;        
        let user = await User.findOne({
            username: userForm.username
        });
        if(!user) {
            res.status(401).json({
                massage: 'tài khoản không tồn tại!'
            })
        }else {
            let comparePassword = await bcrypt.compare(userForm.password, user.password);
            if (!comparePassword) {
                res.status(401).json({
                    message: 'Password is wrong'
                })
            } else {
                let payload = {
                    username: user.username,
                    role: user.role,
                    idUser: user._id
                }
                let token = await jwt.sign(payload, SECRET_KEY, {
                    expiresIn: 36000
                });
                res.status(200).json({
                    token: token,
                    role: user.role,
                    idUser: user._id
                });
            }
        }
    }

}
export default new AuthController();