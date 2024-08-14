import React, { FormEvent, useState } from 'react'
import { useForm } from '@inertiajs/react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
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
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { convertToCapitalizedWords } from '@/lib/utils'
import Role from '#models/role'

interface EditRoleModalProps {
  isOpen: boolean
  role: Role
  onClose: () => void
}

export default function EditRoleModal({ isOpen, onClose, role }: EditRoleModalProps) {
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
          <DialogTitle>Add New Role</DialogTitle>
        </DialogHeader>
        <div className="border info">
          <p>Users Info</p>
          <p>
            <span>Email</span>
            {role.user.email}
          </p>
          <p>
            <span>Name</span>
            {role.user.fullName}
          </p>
          <p>
            <span>Phone</span>
            {role.user.phone}
          </p>
        </div>
        <div className="border info">
          <p>Schools Info</p>
          <p>
            <span>School Name</span>
            {role.school.name}
          </p>
          <p>
            <span>Email</span>
            {role.school.email}
          </p>
          <p>
            <span>address</span>
            {role.school.address}
          </p>
          <p>
            <span>Phone</span>
            {role.school.phone}
          </p>
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
            <Button type="submit" disabled={processing}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
