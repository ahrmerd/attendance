import Student from "#models/student";
import Class from "#models/class";
import { useForm } from "@inertiajs/react";
import React, { ChangeEvent, FormEvent } from 'react'
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
import { ScrollArea } from "@/components/ui/scroll-area";


interface EditStudentModalProps {
    isOpen: boolean
    student: Student
    classes: Class[]
    onClose: () => void
}

const EditStudentModal = ({ isOpen, onClose, student }: EditStudentModalProps) => {
    //make sure you come back to changing classes
    const { data, setData, put, processing, errors, reset } = useForm({
        ...student,
    })

    const handleSelectChange = (value: string) => {
        setData('status', value as 'active' | 'inactive')
      }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        put(`/myschools/students/${student.id}`, {
          preserveState: true,
          preserveScroll: true,
          onSuccess: () => {
            reset()
            onClose()
          },
        })
      }
    return(
        <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto px-4">

        <form onSubmit={handleSubmit}>
          <div className="grid items-center w-full gap-4 ">
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
                onChange={(e) => setData('schoolId', parseInt(e.target.value))}
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
                onChange={(e) => setData('classId', parseInt(e.target.value))}
              />
              {errors.classId && (
                <p className="text-sm text-red-500">{convertToCapitalizedWords(errors.classId)}</p>
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
        </div>

      </DialogContent>
    </Dialog>
    )
}

export default EditStudentModal;