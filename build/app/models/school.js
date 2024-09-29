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
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm';
import Role from '#models/role';
import Class from '#models/class';
export default class School extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], School.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], School.prototype, "name", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], School.prototype, "address", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], School.prototype, "phone", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], School.prototype, "email", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], School.prototype, "status", void 0);
__decorate([
    hasMany(() => Class),
    __metadata("design:type", Object)
], School.prototype, "class", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], School.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], School.prototype, "updatedAt", void 0);
__decorate([
    hasMany(() => Role),
    __metadata("design:type", Object)
], School.prototype, "user", void 0);
//# sourceMappingURL=school.js.map