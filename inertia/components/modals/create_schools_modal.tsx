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
import { Label } from '../ui/label'
import { convertToCapitalizedWords } from '@/lib/utils'

interface School {
  name: string
  address: string
  phone: string
  password: string
  email: string
  status: 'active' | 'inactive'
  password_confirmation: string
}

interface CreateSchoolModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreateSchoolModal({ isOpen, onClose }: CreateSchoolModalProps) {
  const { data, setData, post, processing, errors, reset } = useForm<School>({
    name: '',
    address: '',
    phone: '',
    email: '',
    status: 'active',
    password: '',
    password_confirmation: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData(name as keyof School, value)
  }

  const handleSelectChange = (value: string) => {
    setData('status', value as 'active' | 'inactive')
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post('/schools', {
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
          <DialogTitle>Add New School</DialogTitle>
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
                value={data.email}
                onChange={handleChange}
                className="col-span-3"
              />
              {errors.email && (
                <p className="col-span-3 col-start-2 text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="grid items-center grid-cols-4 gap-4">
              <label htmlFor="password" className="text-right">
                Password
              </label>
              <Input
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                className="col-span-3"
              />
              {errors.password && (
                <p className="col-span-3 col-start-2 text-red-500">
                  {convertToCapitalizedWords(errors.password)}
                </p>
              )}
            </div>

            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="password_confirmation" className="text-right">
                Confirm Password
              </Label>
              <Input
                id="password_confirmation"
                // type="password"
                name="password_confirmation"
                value={data.password_confirmation}
                onChange={handleChange}
                className="col-span-3"

                // onChange={(e) => setData('password_confirmation', e.target.value)}
              />
              {errors.password_confirmation && (
                <p className="col-span-3 col-start-2 text-red-500">
                  {convertToCapitalizedWords(errors.password_confirmation)}
                </p>
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
