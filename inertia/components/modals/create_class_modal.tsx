import Role from '#models/role'
import School from '#models/school'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
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


interface CreateClassModalProps {
  isOpen: boolean
  onClose: () => void
  schools: School[]
  teachers: Role[]
}

export default function CreateClassModal({
  isOpen,
  onClose,
  schools,
  teachers,
}: CreateClassModalProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    schoolId: '',
    teacherId: '',
  })
  console.log(teachers)

  const schoolTeachers = teachers.filter(
    (teacher) => teacher.schoolId === Number.parseInt(data.schoolId)
  )

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post('/myschools/classes', {
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
          <DialogTitle>Add New Class</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid items-center w-full gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Class Name</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                placeholder="Enter class name"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{convertToCapitalizedWords(errors.name)}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="schoolId">School</Label>
              <Select value={data.schoolId} onValueChange={(value) => setData('schoolId', value)}>
                <SelectTrigger id="schoolId">
                  <SelectValue placeholder="Select a school" />
                </SelectTrigger>
                <SelectContent>
                  {schools.map((school) => (
                    <SelectItem key={school.id} value={school.id.toString()}>
                      {school.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.schoolId && (
                <p className="text-sm text-red-500">{convertToCapitalizedWords(errors.schoolId)}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="teacherId">Teacher</Label>
              <Select
                disabled={schoolTeachers.length === 0}
                value={data.teacherId}
                onValueChange={(value) => setData('teacherId', value)}
              >
                <SelectTrigger id="teacherId">
                  <SelectValue placeholder="Select a teacher" />
                </SelectTrigger>
                <SelectContent>
                  {schoolTeachers.map((teacher) => (
                    <SelectItem key={teacher.user.id} value={teacher.user.id.toString()}>
                      {teacher.user.fullName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.teacherId && (
                <p className="text-sm text-red-500">
                  {convertToCapitalizedWords(errors.teacherId)}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={processing} className="mt-3">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
