"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let UsersService = exports.UsersService = class UsersService {
    constructor(userrepo) {
        this.userrepo = userrepo;
    }
    findAll() {
        return this.userrepo.find();
    }
    async create(body) {
        try {
            const existingUser = await this.userrepo.findOne({ where: { email: body.email } });
            if (existingUser) {
                throw new common_1.ConflictException('Este email ya está registrado');
            }
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            body.password = await bcrypt.hash(body.password, salt);
            const newUser = this.userrepo.create(body);
            return this.userrepo.save(newUser);
        }
        catch (error) {
            if (error.status === common_1.HttpStatus.CONFLICT) {
                throw new common_1.HttpException('Este email ya está registrado', common_1.HttpStatus.CONFLICT);
            }
            else {
                throw new common_1.HttpException('Error interno del servidor', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async login(email, password) {
        const user = await this.userrepo.findOne({ where: { email } });
        if (!user) {
            return null;
        }
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            return null;
        }
        const payload = { sub: user.id, email: user.email };
        const secretKey = 'jajaja';
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        return token;
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map