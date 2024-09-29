import factory from '@adonisjs/lucid/factories';
import Attendance from '#models/attendance';
import { DateTime } from 'luxon';
export const AttendanceFactory = factory
    .define(Attendance, async ({ faker }) => {
    return {
        clockIn: DateTime.fromJSDate(faker.date.between({ from: '2024-10-16T00:00:00.000Z', to: '2024-10-21T00:00:00.000Z' })),
    };
})
    .build();
//# sourceMappingURL=attendance_factory.js.map