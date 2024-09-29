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
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm';
import Class from '#models/class';
import Student from '#models/student';
export default class Attendance extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Attendance.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Attendance.prototype, "studentId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Attendance.prototype, "classId", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", DateTime)
], Attendance.prototype, "clockIn", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", DateTime)
], Attendance.prototype, "clockOut", void 0);
__decorate([
    belongsTo(() => Class, {
        foreignKey: 'classId',
    }),
    __metadata("design:type", Object)
], Attendance.prototype, "class", void 0);
__decorate([
    belongsTo(() => Student, {
        foreignKey: 'studentId',
    }),
    __metadata("design:type", Object)
], Attendance.prototype, "student", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Attendance.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], Attendance.prototype, "updatedAt", void 0);
//# sourceMappingURL=attendance.js.map