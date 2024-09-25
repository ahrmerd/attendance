import StudentController from "#controllers/students_controller"
import Class from "#models/class"
import Student from "#models/student"
import EditStudentModal from "@/components/modals/edit_student_modal"
import PaginationComponent from "@/components/pagination_component"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import SchoolLayout from "@/layouts/school_layout"
import { InferPageProps } from "@adonisjs/inertia/types"
import { Head, useForm } from "@inertiajs/react"
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'

export default function ClassStudentIndex(props: InferPageProps<StudentController, 'classStudents'>) {
  const classStudents = props.students.data as Student[];
  const sclass = props.class as Class;
  const classes = props.classes as Class[];
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const { data, setData, get } = useForm({
    search: '',
    page: props.students.meta.currentPage,
  })

  const openEditingModal = (student: Student) => {
    setEditingStudent(student)
    setIsEditModalOpen(true)
  }

  const debouncedGet = debounce(() => {
    get(`/myschools/classes/${sclass.id}/students`, {
      preserveState: true,
      preserveScroll: true,
      only: ['students'],
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
      <Head title="Class Students" />
      <SchoolLayout>
        <div className="container p-4 mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Students List for {sclass.name}</h1>
          </div>
          <Input
            type="text"
            placeholder="Search Student..."
            value={data.search}
            onChange={handleSearch}
            className="max-w-xs mb-4"
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Primary Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.firstName}</TableCell>
                  <TableCell>{student.lastName}</TableCell>
                  <TableCell>{student.class.name}</TableCell>
                  <TableCell>{student.primaryContact}</TableCell>
                  <TableCell>
                  <Button className={student.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}>
                  {student.status}
                </Button>
                    </TableCell>
                  <TableCell>
                    <Button onClick={() => openEditingModal(student)}>Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <PaginationComponent paginationData={props.students.meta} baseRoute={`/myschools/classes/${sclass.id}/students`} />
          {editingStudent && (
            <EditStudentModal
              classes={classes}
              student={editingStudent}
              isOpen={isEditModalOpen}
              onClose={() => {
                setEditingStudent(null)
                setIsEditModalOpen(false)
              }}
            />
          )}
        </div>
      </SchoolLayout>
    </>
  )
}