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

interface CreateUserModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreateStudentModal({ isOpen, onClose }: CreateUserModalProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    firstName: '',
    lastName: '',
    studentId: '',
    primaryContact: '',
    dateOfBirth: '',
    schoolId: '',
    classId: '',
    status: '',
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post('/students', {
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
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid items-center w-full gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={data.firstName}
                onChange={(e) => setData('firstName', e.target.value)}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{convertToCapitalizedWords(errors.firstName)}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lastName">last Name</Label>
              <Input
                id="lastName"
                type="lastName"
                value={data.lastName}
                onChange={(e) => setData('lastName', e.target.value)}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{convertToCapitalizedWords(errors.lastName)}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="studentId">Student Id</Label>
              <Input
                id="studentId"
                type="studentId"
                value={data.studentId}
                onChange={(e) => setData('studentId', e.target.value)}
              />
              {errors.studentId && (
                <p className="text-sm text-red-500">{convertToCapitalizedWords(errors.studentId)}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="primaryContact">Primary Contact</Label>
              <Input
                id="primaryContact"
                type="primaryContact"
                value={data.primaryContact}
                onChange={(e) => setData('primaryContact', e.target.value)}
              />
              {errors.primaryContact && (
                <p className="text-sm text-red-500">{convertToCapitalizedWords(errors.primaryContact)}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="dateOfBirth"
                value={data.dateOfBirth}
                onChange={(e) => setData('dateOfBirth', e.target.value)}
              />
              {errors.dateOfBirth && (
                <p className="text-sm text-red-500">{convertToCapitalizedWords(errors.dateOfBirth)}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="schoolId">School</Label>
              <Input
                id="schoolId"
                type="schoolId"
                value={data.schoolId}
                onChange={(e) => setData('schoolId', e.target.value)}
              />
              {errors.schoolId && (
                <p className="text-sm text-red-500">{convertToCapitalizedWords(errors.schoolId)}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="classId">Class</Label>
              <Input
                id="classId"
                type="classId"
                value={data.classId}
                onChange={(e) => setData('classId', e.target.value)}
              />
              {errors.classId && (
                <p className="text-sm text-red-500">{convertToCapitalizedWords(errors.classId)}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="status">Status</Label>
              <Input
                id="status"
                type="password"
                value={data.status}
                onChange={(e) => setData('status', e.target.value)}
              />
              {errors.status && (
                <p className="text-sm text-red-500">{convertToCapitalizedWords(errors.status)}</p>
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
