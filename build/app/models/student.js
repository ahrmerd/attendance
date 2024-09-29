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
import Class from '#models/class';
import School from '#models/school';
import Attendance from './attendance.js';
export default class Student extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Student.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Student.prototype, "schoolId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Student.prototype, "studentId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Student.prototype, "classId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Student.prototype, "firstName", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Student.prototype, "primaryContact", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Student.prototype, "lastName", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Student.prototype, "status", void 0);
__decorate([
    column({
        serialize: (value) => {
            return value.toString('base64');
        },
    }),
    __metadata("design:type", Buffer)
], Student.prototype, "finger1", void 0);
__decorate([
    column({
        serialize: (value) => {
            return value.toString('base64');
        },
    }),
    __metadata("design:type", Buffer)
], Student.prototype, "finger2", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Student.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], Student.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Class),
    __metadata("design:type", Object)
], Student.prototype, "class", void 0);
__decorate([
    hasMany(() => Attendance),
    __metadata("design:type", Object)
], Student.prototype, "attendance", void 0);
__decorate([
    belongsTo(() => School),
    __metadata("design:type", Object)
], Student.prototype, "school", void 0);
//# sourceMappingURL=student.js.map