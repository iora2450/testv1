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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("../entities/task.entity");
let TasksService = exports.TasksService = class TasksService {
    constructor(taskrepo) {
        this.taskrepo = taskrepo;
    }
    findAll() {
        return this.taskrepo.find();
    }
    async findOne(id) {
        const options = { where: { id } };
        const task = await this.taskrepo.findOne(options);
        return task || null;
    }
    create(userid, body) {
        try {
            const newTask = this.taskrepo.create({ ...body, userid: parseInt(userid, 10) });
            return this.taskrepo.save(newTask);
        }
        catch (error) {
            console.error(error);
            throw new Error('Error al guardar la tarea.');
        }
    }
    async update(id, sub, body) {
        const task = await this.taskrepo.findOne({
            where: {
                id: id
            }
        });
        this.taskrepo.merge(task, body);
        return this.taskrepo.save(task);
    }
    delete(id) {
        this.taskrepo.delete(id);
        return true;
    }
    async TasksUser(userid) {
        const options = { where: { userid } };
        const task = await this.taskrepo.find(options);
        return task || null;
    }
};
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Tasks)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map