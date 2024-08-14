import React, { ChangeEvent, FormEvent } from 'react'
import { useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import School from '#models/school'
import { DialogDescription } from '@radix-ui/react-dialog'
// import School from '#models/school'

interface SchoolProps {
  name: string
  address: string
  phone: string
  // password: string
  email: string | null
  status: 'active' | 'inactive'
  // password_confirmation: string
}

interface EditSchoolModalProps {
  isOpen: boolean
  onClose: () => void
  school: School
}

export default function EditSchoolModal({ isOpen, onClose, school }: EditSchoolModalProps) {
  const { data, setData, put, processing, errors, reset } = useForm<SchoolProps>({
    // id: school.id,
    name: school.name,
    address: school.address,
    phone: school.phone,
    email: school.email,
    status: school.status,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData(name as keyof SchoolProps, value)
  }

  const handleSelectChange = (value: string) => {
    setData('status', value as 'active' | 'inactive')
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    put(`/schools/${school.id}`, {
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
          <DialogTitle>
            Edit School:
            <span>{school.name}</span>
          </DialogTitle>
          {/* <DialogDescription></DialogDescription> */}
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={data.name}
                onChange={handleChange}
                className="col-span-3"
              />
              {errors.name && <p className="col-span-3 col-start-2 text-red-500">{errors.name}</p>}
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <label htmlFor="address" className="text-right">
                Address
              </label>
              <Input
                id="address"
                name="address"
                value={data.address}
                onChange={handleChange}
                className="col-span-3"
              />
              {errors.address && (
                <p className="col-span-3 col-start-2 text-red-500">{errors.address}</p>
              )}
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <label htmlFor="phone" className="text-right">
                Phone
              </label>
              <Input
                id="phone"
                name="phone"
                value={data.phone}
                onChange={handleChange}
                className="col-span-3"
              />
              {errors.phone && (
                <p className="col-span-3 col-start-2 text-red-500">{errors.phone}</p>
              )}
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <label htmlFor="email" className="text-right">
                Email
              </label>
              <Input
                id="email"
                name="email"
                value={data.email ?? ''}
                onChange={handleChange}
                className="col-span-3"
              />
              {errors.email && (
                <p className="col-span-3 col-start-2 text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="grid items-center grid-cols-4 gap-4">
              <label htmlFor="status" className="text-right">
                Status
              </label>
              <Select onValueChange={handleSelectChange} defaultValue={data.status}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="col-span-3 col-start-2 text-red-500">{errors.status}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={processing}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
