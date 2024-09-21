import { InferPageProps } from '@adonisjs/inertia/types'
import ClassesController from '#controllers/classes_controller'
import { Head, Link } from '@inertiajs/react'
import SchoolLayout from '@/layouts/school_layout'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import CreateClassModal from '@/components/modals/create_class_modal'
import { useState } from 'react'
import School from '#models/school'
import User from '#models/user'
import Class from '#models/class'
import Role from '#models/role'

type ClassWithRelations = Class & {
  school: School
  teacher: User
}

export default function ClassIndex(props: InferPageProps<ClassesController, 'index'>) {
  const classes = props.classes.data as ClassWithRelations[]
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Head title="Classes" />
      <SchoolLayout>
        <div className="container p-4 mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Classes List</h1>
            <Button className="mb-4" onClick={() => setIsModalOpen(true)}>
              Add New Class
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>School</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((classItem) => (
                <TableRow key={classItem.id}>
                  <TableCell>{classItem.id}</TableCell>
                  <TableCell>{classItem.name}</TableCell>
                  <TableCell>{classItem.school?.name || 'N/A'}</TableCell>
                  <TableCell>{classItem.teacher?.fullName || 'N/A'}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Link href={`/myschools/classes/${classItem.id}/attendances`}>
                        View Attendance
                      </Link>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Link href={`/myschools/classes/${classItem.id}/students`}>
                        View Students
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <CreateClassModal
            schools={props.schools as School[]}
            teachers={props.schoolTeachers as Role[]}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            // onSubmit={handleAddRole}
          />
        </div>
      </SchoolLayout>
    </>
  )
}
