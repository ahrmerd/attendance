import { InferPageProps } from "@adonisjs/inertia/types"
import AttendancesController from "#controllers/attendances_controller"
import { Head, Link } from "@inertiajs/react"
import SchoolLayout from "@/layouts/school_layout"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import Attendance from "#models/attendance"
import Student from "#models/student"
import Class from "#models/class"
import { DateTime } from "luxon"

type AttendanceWithRelations = Attendance & {
  student: Student
  class: Class
}

export default function AttendanceIndex({ attendances }: InferPageProps<AttendancesController, 'index'>) {
  const [searchTerm, setSearchTerm] = useState("")
  console.log(attendances);
  
  const attendanceData = attendances.data as AttendanceWithRelations[]

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <>
      <Head title="Attendance" />
      <SchoolLayout>
        <div className="container p-4 mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Attendance List</h1>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <Button>Search</Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Clock In</TableHead>
                {/* <TableHead>Clock Iasn</TableHead> */}
                <TableHead>Clock Out</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceData.map((attendance) => (
                <TableRow key={attendance.id}>
                  <TableCell>{attendance.id}</TableCell>
                  <TableCell>{`${attendance.student.firstName} ${attendance.student.lastName}`}</TableCell>
                  <TableCell>{attendance.class.name}</TableCell>
                  <TableCell>{DateTime.fromISO(attendance.clockIn as unknown as string).toLocaleString(DateTime.DATETIME_MED)}</TableCell>
                  {/* <TableCell>{attendance.clockIn.toFormat('yyyy LLL dd HH:m')}</TableCell> */}
                  <TableCell>{DateTime.fromISO(attendance.clockOut as unknown as string).toLocaleString(DateTime.DATETIME_MED) || 'Not clocked out'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Pagination controls can be added here */}
        </div>
      </SchoolLayout>
    </>
  )
}