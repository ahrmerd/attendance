import { useState, useEffect } from 'react'
import { InferPageProps } from "@adonisjs/inertia/types"
import AttendancesController from "#controllers/attendances_controller"
import { Head, useForm } from "@inertiajs/react"
import SchoolLayout from "@/layouts/school_layout"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Attendance from "#models/attendance"
import Student from "#models/student"
import Class from "#models/class"
import { DateTime } from "luxon"
import PaginationComponent from "@/components/pagination_component"
import { debounce } from 'lodash'

type AttendanceWithRelations = Attendance & {
  student: Student
  class: Class
}

export default function AttendanceIndex({ attendances, classId }: InferPageProps<AttendancesController, 'index'>) {
  const attendanceData = attendances.data as AttendanceWithRelations[]


  const { data, setData, get } = useForm({
    search: '',
    page: attendances.meta.currentPage,
  });

  const debouncedGet = debounce(() => {
    get(`/myschools/classes/${classId}/attendances`, {
      preserveState: true,
      preserveScroll: true,
      only: ['attendances'],
    })
  }, 300)

  useEffect(() => {
    debouncedGet()
    return debouncedGet.cancel
  }, [data.search])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData('search', e.target.value)
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
                value={data.search}
                onChange={handleSearch}
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Clock In</TableHead>
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
                  <TableCell>{attendance.clockOut ? DateTime.fromISO(attendance.clockOut as unknown as string).toLocaleString(DateTime.DATETIME_MED) : 'Not clocked out'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <PaginationComponent 
            paginationData={attendances.meta} 
            baseRoute={`/myschools/classes/${classId}/attendances`}
          />
        </div>
      </SchoolLayout>
    </>
  )
}