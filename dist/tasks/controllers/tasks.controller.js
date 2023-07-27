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
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./../services/tasks.service");
const jwt = require("jsonwebtoken");
const task_entity_1 = require("../entities/task.entity");
let TasksController = exports.TasksController = class TasksController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    getAll1() {
        return [1, 2, 3];
    }
    TaskforUser(request) {
        try {
            const token = request.headers.authorization?.split(' ')[1];
            const secretKey = 'jajaja';
            const payload = jwt.verify(token, secretKey);
            const sub = payload.sub;
            const email = payload.email;
            return this.taskService.TasksUser(sub);
        }
        catch (error) {
            console.error(error);
            return { message: 'Token inválido' };
        }
    }
    getOne(id) {
        return this.getOne(id);
    }
    create(request, body) {
        try {
            const token = request.headers.authorization?.split(' ')[1];
            const secretKey = 'jajaja';
            const payload = jwt.verify(token, secretKey);
            const sub = payload.sub;
            const email = payload.email;
            return this.taskService.create(sub, body);
        }
        catch (error) {
            console.error(error);
            return { message: 'Token inválido' };
        }
    }
    update(id, request, body) {
        try {
            const token = request.headers.authorization?.split(' ')[1];
            const secretKey = 'jajaja';
            const payload = jwt.verify(token, secretKey);
            const sub = payload.sub;
            const email = payload.email;
            return this.taskService.update(id, sub, body);
        }
        catch (error) {
            console.error(error);
            return { message: 'Token inválido' };
        }
    }
    delete(id, request) {
        try {
            const token = request.headers.authorization?.split(' ')[1];
            const secretKey = 'jajaja';
            const payload = jwt.verify(token, secretKey);
            const sub = payload.sub;
            const email = payload.email;
            return this.taskService.delete(id);
        }
        catch (error) {
            console.error(error);
            return { message: 'Token inválido' };
        }
    }
};
__decorate([
    (0, common_1.Get)('filter1'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getAll1", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "TaskforUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, task_entity_1.Tasks]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, task_entity_1.Tasks]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "delete", null);
exports.TasksController = TasksController = __decorate([
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map