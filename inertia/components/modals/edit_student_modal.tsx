import Class from "#models/class";
import Student from "#models/student";
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { convertToCapitalizedWords } from '@/lib/utils';
import { useForm } from "@inertiajs/react";
import { FormEvent } from 'react';
import { Label } from '../ui/label';

interface EditStudentModalProps {
  isOpen: boolean
  student: Student
  classes: Class[]
  onClose: () => void
}

const EditStudentModal = ({ isOpen, onClose, student, classes }: EditStudentModalProps) => {
  const { data, setData, put, processing, errors, reset } = useForm({
    ...student,
  })

  const handleSelectChange = (value: string) => {
    setData('status', value as 'active' | 'inactive')
  }

  const handleClassChange = (value: string) => {
    setData('classId', parseInt(value))
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Student Data</DialogTitle>
        </DialogHeader>
        <p className="font-bold">{student.school.name}</p>
        <div className="max-h-[60vh] overflow-y-auto px-4">
          <form onSubmit={handleSubmit}>
            <div className="grid items-center w-full gap-4 ">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="firstName" className="font-bold">First Name</Label>
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
                <Label htmlFor="lastName" className="font-bold">Last Name</Label>
                <Input
                  id="lastName"
                  value={data.lastName}
                  onChange={(e) => setData('lastName', e.target.value)}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">{convertToCapitalizedWords(errors.lastName)}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="primaryContact" className="font-bold">Primary Contact</Label>
                <Input
                  id="primaryContact"
                  value={data.primaryContact}
                  onChange={(e) => setData('primaryContact', e.target.value)}
                />
                {errors.primaryContact && (
                  <p className="text-sm text-red-500">{convertToCapitalizedWords(errors.primaryContact)}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="schoolId" className="font-bold">School</Label>
                <Input
                  id="schoolId"
                  value={data.schoolId}
                  onChange={(e) => setData('schoolId', parseInt(e.target.value))}
                />
                {errors.schoolId && (
                  <p className="text-sm text-red-500">{convertToCapitalizedWords(errors.schoolId)}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="classId" className="font-bold">Class</Label>
                <Select onValueChange={handleClassChange} defaultValue={data.classId.toString()}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((classItem) => (
                      <SelectItem key={classItem.id} value={classItem.id.toString()}>
                        {classItem.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.classId && (
                  <p className="text-sm text-red-500">{convertToCapitalizedWords(errors.classId)}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="status" className="font-bold">Status</Label>
                <Select onValueChange={handleSelectChange} defaultValue={data.status}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-sm text-red-500">{convertToCapitalizedWords(errors.status)}</p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={processing} className="mt-3">
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