import ClassesController from '#controllers/classes_controller'
import Class from '#models/class'
import Role from '#models/role'
import School from '#models/school'
import User from '#models/user'
import CreateClassModal from '@/components/modals/create_class_modal'
import EditClassModal from '@/components/modals/edit_class_modal'
import PaginationComponent from '@/components/pagination_component'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import SchoolLayout from '@/layouts/school_layout'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head, Link, useForm } from '@inertiajs/react'
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'


type ClassWithRelations = Class & {
  school: School
  teacher: User
}

export default function ClassIndex(props: InferPageProps<ClassesController, 'index'>) {
  const classes = props.classes.data as ClassWithRelations[]
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingClass, setEditingClass] = useState<Class | null>()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const { data, setData, get } = useForm({
    search: '',
    page: props.classes.meta.currentPage,
  })

  useEffect(() => {
    debouncedGet()
    return debouncedGet.cancel
  }, [data.search])

  const openEditingModal = (classs: Class) => {
    setEditingClass(classs)
    setIsEditModalOpen(true)
  }

  const debouncedGet = debounce(() => {
    get(`/myschools/classes?`, {
      preserveState: true,
      preserveScroll: true,
      only: ['classes'],
    })
  }, 300)
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
          <Input
            type="text"
            placeholder="Search Class..."
            value={data.search}
            onChange={(e) => setData('search', e.target.value)}
            className="max-w-xs"
          />
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
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-5"
                      onClick={() => openEditingModal(classItem)}
                    >
                      Edit
                    </Button>

                    <Button variant="outline" size="sm" className="mr-5">

                      <Link href={`/myschools/classes/${classItem.id}/attendances`}>
                        View Attendance
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="mr-5">

                      <Link href={`/myschools/classes/${classItem.id}/students`}>
                        View Students
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <PaginationComponent paginationData={props.classes.meta} baseRoute="/myschools/classes" />
          <CreateClassModal
            schools={props.schools as School[]}
            teachers={props.schoolTeachers as Role[]}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            // onSubmit={handleAddRole}
          />
          {editingClass && (
            <EditClassModal
              classs={editingClass}
              teachers={props.schoolTeachers as Role[]}
              isOpen={isEditModalOpen}
              onClose={() => {
                setEditingClass(null)
                setIsEditModalOpen(false)
              }}
            />
          )}
        </div>
      </SchoolLayout>
    </>
  )
}
