var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DateTime } from 'luxon';
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import School from '#models/school';
import User from '#models/user';
import Attendance from '#models/attendance';
export default class Class extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Class.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Class.prototype, "schoolId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Class.prototype, "name", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Class.prototype, "status", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Class.prototype, "teacherId", void 0);
__decorate([
    belongsTo(() => School),
    __metadata("design:type", Object)
], Class.prototype, "school", void 0);
__decorate([
    belongsTo(() => User, {
        foreignKey: 'teacherId',
    }),
    __metadata("design:type", Object)
], Class.prototype, "teacher", void 0);
__decorate([
    hasMany(() => Attendance),
    __metadata("design:type", Object)
], Class.prototype, "attendance", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Class.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], Class.prototype, "updatedAt", void 0);
//# sourceMappingURL=class.js.map