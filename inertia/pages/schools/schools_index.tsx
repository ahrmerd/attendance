import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import AdminLayout from '@/layouts/admin_layout'
import { Head } from '@inertiajs/react'
import CreateSchoolModal from '@/components/modals/create_schools_modal'
import { InferPageProps } from '@adonisjs/inertia/types'
import type SchoolsController from '#controllers/schools_controller'
import School from '#models/school'
import EditSchoolModal from '@/components/modals/edit_school_modal'
// import CreateSchoolModal from './CreateSchoolModal'

export default function SchoolsIndex(props: InferPageProps<SchoolsController, 'index'>) {
  // const [schools, setSchools] = useState<School[]>([
  //   { id: 1, name: 'Springfield Elementary', address: '123 School St', phone: '555-1234' },
  //   { id: 2, name: 'Central High', address: '456 Education Ave', phone: '555-5678' },
  // ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingSchool, setEditingSchool] = useState<School | null>()
  const schools = props.schools as School[]

  const openEditingModal = (school: School) => {
    setEditingSchool(school)
    setIsEditModalOpen(true)
  }

  // const handleAddSchool = (newSchool: Omit<School, 'id'>) => {
  //   setSchools([...schools, { id: schools.length + 1, ...newSchool }])
  // }

  return (
    <>
      <Head title="Homepage" />
      <AdminLayout>
        <div className="container p-4 mx-auto">
          <h1 className="mb-4 text-2xl font-bold">Schools List</h1>
          <Button className="mb-4" onClick={() => setIsModalOpen(true)}>
            Add New School
          </Button>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schools.map((school) => (
                <TableRow key={school.id}>
                  <TableCell>{school.id}</TableCell>
                  <TableCell>{school.name}</TableCell>
                  <TableCell>{school.address}</TableCell>
                  <TableCell>{school.phone}</TableCell>
                  <TableCell>
                    <Button className={school.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}>
                      {school.status}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => openEditingModal(school)}>Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <CreateSchoolModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            // onSubmit={handleAddSchool}
          />
          {editingSchool && (
            <EditSchoolModal
              school={editingSchool}
              isOpen={isEditModalOpen}
              onClose={() => {
                setEditingSchool(null)
                setIsEditModalOpen(false)
              }}
            />
          )}
        </div>
      </AdminLayout>
    </>
  )
}
