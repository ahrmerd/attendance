import { Button, buttonVariants } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Head, Link } from '@inertiajs/react'
import { useState } from 'react'
// import CreateRoleModal from '@/components/modals/create_roles_modal'
import type RolesController from '#controllers/roles_controller'
import Role from '#models/role'
import EditStaffModal from '@/components/modals/edit_staff_modal'
import { Input } from '@/components/ui/input'
import SchoolLayout from '@/layouts/school_layout'
import { cn } from '@/lib/utils'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Trash2 } from 'lucide-react'

export default function StaffsIndex(props: InferPageProps<RolesController, 'index'>) {
  // const [roles, setRole] = useState<Role[]>([
  //   { id: 1, name: 'Springfield Elementary', address: '123 Role St', phone: '555-1234' },
  //   { id: 2, name: 'Central High', address: '456 Education Ave', phone: '555-5678' },
  // ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>()
  const [search, setSearch] = useState('')
  const roles = props.roles as Role[]

  const openEditingModal = (role: Role) => {
    setEditingRole(role)
    setIsEditModalOpen(true)
  }

  const filteredRoles = () => {
    return roles.filter((role) => {
      const searchText = search.toLowerCase() // Assuming 'search' is the state
      return (
        role.role.toLowerCase().includes(searchText) || // Search in role name
        role.user.fullName.toLowerCase().includes(searchText) || // Search in user name
        role.user.email.toLowerCase().includes(searchText) || // Search in user name
        role.user.phone?.toLowerCase().includes(searchText) || // Search in user name
        role.school.name.toLowerCase().includes(searchText) || // Search in school name
        role.school.email?.toLowerCase().includes(searchText) || // Search in school name
        role.school.phone?.toLowerCase().includes(searchText) || // Search in school name
        role.school.address.toLowerCase().includes(searchText) // Search in school name
      )
    })
  }

  // const { data, setData, get } = useForm({
  //   search: '',
  //   page: props.roles.meta.currentPage,
  // })

  // useEffect(() => {
  //   debouncedGet()
  //   return debouncedGet.cancel
  // }, [data.search])

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
  // const debouncedGet = debounce(() => {
  //   get('/myschools/staffs', {
  //     preserveState: true,
  //     preserveScroll: true,
  //     only: ['roles'],
  //   })
  // }, 300)

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const query = e.target.value
  //   setData('search', query)
  //   debouncedSearch(query)
  // }

  return (
    <>
      <Head title="Homepage" />
      <SchoolLayout>
        <div className="container p-4 mx-auto">
          <h1 className="mb-4 text-2xl font-bold">Staff List</h1>

          <Input
            type="text"
            placeholder="Search staffs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
              {filteredRoles().map((role) => (
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
          {/* <PaginationComponent paginationData={props.roles.meta} baseRoute="/roles" /> */}

          {editingRole && (
            <EditStaffModal
              role={editingRole}
              isOpen={isEditModalOpen}
              onClose={() => {
                setEditingRole(null)
                setIsEditModalOpen(false)
              }}
            />
          )}
        </div>
      </SchoolLayout>
    </>
  )
}
