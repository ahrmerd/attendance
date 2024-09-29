import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Head, useForm } from '@inertiajs/react'
import { useEffect, useState } from 'react'
// import CreateUserModal from '@/components/modals/create_users_modal'
import type StudentsController from '#controllers/students_controller'
import Class from '#models/class'
import Student from '#models/student'
import PaginationComponent from '@/components/pagination_component'
import { Input } from '@/components/ui/input'
import SchoolLayout from '@/layouts/school_layout'
import { InferPageProps } from '@adonisjs/inertia/types'
import { debounce } from 'lodash'

import EditStudentModal from '@/components/modals/edit_student_modal'

export default function StudentIndex(props: InferPageProps<StudentsController, 'index'>) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<Student | null>()
  console.log(props.students)
  const student = props.students.data as Student[]
  const classes = props.classes as Class[]

  const openEditingModal = (mstudent: Student) => {
    setEditingUser(mstudent)
    setIsEditModalOpen(true)
  }
  const openPasswordModal = (mstudent: Student) => {
    setEditingUser(mstudent)
    setIsPasswordModalOpen(true)
  }

  const { data, setData, get } = useForm({
    search: '',
    page: props.students.meta.currentPage,
  })

  useEffect(() => {
    debouncedGet()
    return debouncedGet.cancel
  }, [data.search])

  // const debouncedSearch = useCallback(
  //   debounce((query: string) => {
  //     console.log(query)
  //     get(`/users?search=${query}`, {
  //       preserveState: true,
  //       preserveScroll: true,
  //       only: ['users'],
  //     })
  //   }, 300),
  //   []
  // )
  const debouncedGet = debounce(() => {
    get(`/myschools/students?`, {
      preserveState: true,
      preserveScroll: true,
      only: ['students'],
    })
  }, 300)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    debouncedGet()
  }

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const query = e.target.value
  //   setData('search', query)
  //   debouncedSearch(query)
  // }

  return (
    <>
      <Head title="Students" />
      <SchoolLayout>
        <div className="container p-4 mx-auto">
          <h1 className="mb-4 text-2xl font-bold">Students List</h1>
          <Input
            type="text"
            placeholder="Search Student..."
            value={data.search}
            onChange={(e) => setData('search', e.target.value)}
            className="max-w-xs"
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                {/* <TableHead>Student Id</TableHead> */}
                <TableHead>Contact</TableHead>
                {/* <TableHead>Date of Birth</TableHead> */}
                <TableHead>School</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {student.map((mstudent) => (
                <TableRow key={mstudent.id}>
                  <TableCell>{mstudent.id}</TableCell>
                  <TableCell>{mstudent.firstName}</TableCell>
                  <TableCell>{mstudent.lastName}</TableCell>
                  {/* <TableCell>{student.studentId}</TableCell> */}
                  <TableCell>{mstudent.primaryContact}</TableCell>
                  {/* <TableCell>{student.dateOfBirth}</TableCell> */}
                  <TableCell>{mstudent.school.name}</TableCell>
                  <TableCell>{mstudent.class.name}</TableCell>

                  <TableCell>
                    <Button
                      className={mstudent.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}
                    >
                      {mstudent.status}
                    </Button>
                  </TableCell>

                  <TableCell className="flex">
                    <Button className="mr-4 " onClick={() => openEditingModal(mstudent)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <PaginationComponent
            paginationData={props.students.meta}
            baseRoute="myschools/students"
          />
          {/* <CreateStudentModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            // onSubmit={handleAddUser}
          /> */}
          {editingUser && (
            <EditStudentModal
              student={editingUser}
              isOpen={isEditModalOpen}
              classes={classes}
              onClose={() => {
                setEditingUser(null)
                setIsEditModalOpen(false)
              }}
            />
          )}

        </div>
      </SchoolLayout>
    </>
  )
}
