import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button, buttonVariants } from '@/components/ui/button'
import AdminLayout from '@/layouts/admin_layout'
import { Head, Link, useForm } from '@inertiajs/react'
// import CreateRoleModal from '@/components/modals/create_roles_modal'
import { InferPageProps } from '@adonisjs/inertia/types'
import type RolesController from '#controllers/roles_controller'
import Role from '#models/role'
import PaginationComponent from '@/components/pagination_component'
import { debounce } from 'lodash'
import { Input } from '@/components/ui/input'
import CreateRoleModal from '@/components/modals/create_role_modal'
import { Trash2 } from 'lucide-react'
import EditRoleModal from '@/components/modals/edit_role_modal'
import { cn } from '@/lib/utils'

export default function RoleIndex(props: InferPageProps<RolesController, 'index'>) {
  // const [roles, setRole] = useState<Role[]>([
  //   { id: 1, name: 'Springfield Elementary', address: '123 Role St', phone: '555-1234' },
  //   { id: 2, name: 'Central High', address: '456 Education Ave', phone: '555-5678' },
  // ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>()
  const roles = props.roles.data as Role[]

  const openEditingModal = (role: Role) => {
    setEditingRole(role)
    setIsEditModalOpen(true)
  }

  const { data, setData, get } = useForm({
    search: '',
    page: props.roles.meta.currentPage,
  })

  useEffect(() => {
    debouncedGet()
    return debouncedGet.cancel
  }, [data.search])

  // const debouncedSearch = useCallback(
  //   debounce((query: string) => {
  //     console.log(query)
  //     get(`/roles?search=${query}`, {
  //       preserveState: true,
  //       preserveScroll: true,
  //       only: ['roles'],
  //     })
  //   }, 300),
  //   []
  // )
  const debouncedGet = debounce(() => {
    get('/roles', {
      preserveState: true,
      preserveScroll: true,
      only: ['roles'],
    })
  }, 300)

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const query = e.target.value
  //   setData('search', query)
  //   debouncedSearch(query)
  // }

  return (
    <>
      <Head title="Homepage" />
      <AdminLayout>
        <div className="container p-4 mx-auto">
          <h1 className="mb-4 text-2xl font-bold">Role List</h1>
          <Button className="mb-4" onClick={() => setIsModalOpen(true)}>
            Add New Role
          </Button>
          <Input
            type="text"
            placeholder="Search roles..."
            value={data.search}
            onChange={(e) => setData('search', e.target.value)}
            className="max-w-xs"
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Users ID</TableHead>
                <TableHead>Users Name</TableHead>
                <TableHead>Users Email</TableHead>
                <TableHead>Schools ID</TableHead>
                <TableHead>Schools Name</TableHead>
                <TableHead>Schools Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>{role.user.id}</TableCell>
                  <TableCell>{role.user.fullName}</TableCell>
                  <TableCell>{role.user.email}</TableCell>
                  <TableCell>{role.school.id}</TableCell>
                  <TableCell>{role.school.name}</TableCell>
                  <TableCell>{role.school.email}</TableCell>
                  <TableCell>{role.role}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button onClick={() => openEditingModal(role)}>Edit</Button>
                      {/* <Button> */}
                      <Link
                        className={cn(buttonVariants())}
                        href={`/roles/${role.id}`}
                        as="button"
                        method="delete"
                      >
                        <Trash2 />
                      </Link>
                    </div>
                    {/* </Button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <PaginationComponent paginationData={props.roles.meta} baseRoute="/roles" />
          <CreateRoleModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            // onSubmit={handleAddRole}
          />
          {editingRole && (
            <EditRoleModal
              role={editingRole}
              isOpen={isEditModalOpen}
              onClose={() => {
                setEditingRole(null)
                setIsEditModalOpen(false)
              }}
            />
          )}
        </div>
      </AdminLayout>
    </>
  )
}
