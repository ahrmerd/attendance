import Role from '#models/role'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { convertToCapitalizedWords } from '@/lib/utils'
import { useForm } from '@inertiajs/react'
import { FormEvent } from 'react'

interface EditRoleModalProps {
  isOpen: boolean
  role: Role
  onClose: () => void
}

export default function EditStaffModal({ isOpen, onClose, role }: EditRoleModalProps) {
  const { data, setData, put, processing, errors, reset } = useForm({
    role: role.role,
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    put(`/roles/${role.id}`, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        reset()
        onClose()
      },
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Role/Staff Data</DialogTitle>
        </DialogHeader>
        <div>
          <p>
            <span className='font-bold mr-3'>Email:</span>
            {role.user.email}
          </p>
          <p>
            <span className='font-bold mr-3'>User Name:</span>
            {role.user.fullName}
          </p>
          {/* <p> */}
            {/* <span className='font-bold mr-3'>Phone No:</span>
            {role.user.phone}
          </p> */}
          <p>
            <span className='font-bold mr-3'>School Name:</span>
            {role.school.name}
          </p>
          {/* <p>
            <span className='font-bold mr-3'>Email:</span>
            {role.school.email}
          </p>
          <p>
            <span className='font-bold mr-3'>Address:</span>
            {role.school.address}
          </p>
          <p>
            <span className='font-bold mr-3'>School Phone No:</span>
            {role.school.phone}
          </p> */}
          <Button className={role.school.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}>
            {role.school.status}
          </Button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid items-center w-full gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="role">Role</Label>
              <Select
                value={data.role}
                onValueChange={(value) => setData('role', value as 'admin' | 'teacher')}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-sm text-red-500">{convertToCapitalizedWords(errors.role)}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={processing} className='mt-3'>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
