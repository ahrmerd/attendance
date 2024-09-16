import { InferPageProps } from "@adonisjs/inertia/types"
import StudentController from "#controllers/students_controller"
import { Head, Link } from "@inertiajs/react"
import SchoolLayout from "@/layouts/school_layout"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import EditStudentModal from "@/components/modals/edit_student_modal"
import { useState } from "react"
import Student from "#models/student"
import Class from "#models/class"




export default function ClassStudentIndex(props: InferPageProps<StudentController, 'classStudents'>) {
    const classStudents = props.students.data as Student[];
    const sclass = props.class as Class;
    const classes = props.classes as Class[];
    const [editingStudent, setEditingStudent] = useState<Student | null>()
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const openEditingModal = (student: Student) => {
        setEditingStudent(student)
        setIsEditModalOpen(true)
      }

//   const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Head title="Class Students" />
      <SchoolLayout>
        <div className="container p-4 mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Students List</h1>
           
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Primary Number</TableHead>
                <TableHead>Date Of Birth</TableHead>
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
                  <TableCell>{student.dateOfBirth}</TableCell>
                  <TableCell>{student.status}</TableCell>
                  <TableCell>
                      <Button onClick={() => openEditingModal(student)}>Edit</Button>
                    {/* <Button variant="outline" size="sm">Edit</Button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          { editingStudent &&
             (<EditStudentModal
                classes={classes}
                student={editingStudent}
                isOpen={isEditModalOpen}
                onClose={() => {
                    setEditingStudent(null)
                    setIsEditModalOpen(false)
            }}
            // onSubmit={handleAddRole}
          />)}
        </div>
      </SchoolLayout>
    </>
  )
}