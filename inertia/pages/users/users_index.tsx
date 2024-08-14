import { useState, useCallback, useEffect } from 'react'
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
import { Head, router, useForm } from '@inertiajs/react'
// import CreateUserModal from '@/components/modals/create_users_modal'
import { InferPageProps } from '@adonisjs/inertia/types'
import type UserController from '#controllers/users_controller'
import User from '#models/user'
import { BadgeXIcon, VerifiedIcon } from 'lucide-react'
import CreateUserModal from '@/components/modals/create_users_modal'
import EditUserModal from '@/components/modals/edit_users_modal'
import ChangeUserPasswordModal from '@/components/modals/change_user_password_modal'
import PaginationComponent from '@/components/pagination_component'
import { debounce } from 'lodash'
import { Input } from '@/components/ui/input'

export default function UserIndex(props: InferPageProps<UserController, 'index'>) {
  // const [users, setUser] = useState<User[]>([
  //   { id: 1, name: 'Springfield Elementary', address: '123 User St', phone: '555-1234' },
  //   { id: 2, name: 'Central High', address: '456 Education Ave', phone: '555-5678' },
  // ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>()
  const users = props.users.data as User[]

  const openEditingModal = (user: User) => {
    setEditingUser(user)
    setIsEditModalOpen(true)
  }
  const openPasswordModal = (user: User) => {
    setEditingUser(user)
    setIsPasswordModalOpen(true)
  }

  const { data, setData, get } = useForm({
    search: '',
    page: props.users.meta.currentPage,
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
    get(`/users?`, {
      preserveState: true,
      preserveScroll: true,
      only: ['users'],
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
      <Head title="Homepage" />
      <AdminLayout>
        <div className="container p-4 mx-auto">
          <h1 className="mb-4 text-2xl font-bold">User List</h1>
          <Button className="mb-4" onClick={() => setIsModalOpen(true)}>
            Add New User
          </Button>
          <Input
            type="text"
            placeholder="Search users..."
            value={data.search}
            onChange={(e) => setData('search', e.target.value)}
            className="max-w-xs"
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>System Admin</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.isSystemAdmin ? <VerifiedIcon /> : <BadgeXIcon />}</TableCell>
                  <TableCell>
                    <Button className="mr-4 " onClick={() => openEditingModal(user)}>
                      Edit
                    </Button>
                    <Button onClick={() => openPasswordModal(user)}>Change Password</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <PaginationComponent paginationData={props.users.meta} baseRoute="/users" />
          <CreateUserModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            // onSubmit={handleAddUser}
          />
          {editingUser && (
            <EditUserModal
              user={editingUser}
              isOpen={isEditModalOpen}
              onClose={() => {
                setEditingUser(null)
                setIsEditModalOpen(false)
              }}
            />
          )}
          {editingUser && (
            <ChangeUserPasswordModal
              user={editingUser}
              isOpen={isPasswordModalOpen}
              onClose={() => {
                setEditingUser(null)
                setIsPasswordModalOpen(false)
              }}
            />
          )}
        </div>
      </AdminLayout>
    </>
  )
}
