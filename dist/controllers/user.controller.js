"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    //Validacion de usuario
    const user = yield user_1.User.findOne({ where: { username: username } });
    if (user) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre ${username}`
        });
    }
    const hashPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        //Guarda el usuario en la base de datos
        yield user_1.User.create({
            username: username,
            password: hashPassword
        });
        res.json({
            msg: `Usuario ${username} creado exitosamente!`,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ocurrio un error",
            error
        });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    //se valida si el usuario exite en la base de datos
    const user = yield user_1.User.findOne({ where: { username: username } });
    if (!user) {
        return res.status(400).json({
            msg: `No exite el usuario ${username} en la base de datos!`
        });
    }
    //Validacion de password
    const passwordValida = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordValida) {
        return res.status(400).json({
            msg: `Password incorrecta!`
        });
    }
    //Genera el token
    const token = jsonwebtoken_1.default.sign({
        username: username
    }, process.env.CLAVE_SECRETA || 'juan12345', { expiresIn: '3600000' });
    /*res.cookie('token', token,{httpOnly: true,maxAge: 3600000})*/
    console.log(token);
    res.json(token);
});
exports.loginUser = loginUser;
