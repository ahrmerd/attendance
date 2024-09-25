import Class from '#models/class'
import Role from '#models/role'
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

interface EditClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  classs: Class;
  teachers: Role[];
}

export default function EditClassModal({ isOpen, onClose, classs: classData, teachers }: EditClassModalProps) {
  const { data, setData, put, processing, errors, reset } = useForm({
    name: classData.name,
    teacherId: classData.teacherId,
  })

  const handleTeacherChange = (value: string) => {
    setData('teacherId', parseInt(value))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    put(`/myschools/classes/${classData.id}`, {
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
          <DialogTitle>Edit Class: {classData.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid items-center w-full gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Class Name</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{convertToCapitalizedWords(errors.name)}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="teacherId">Teacher</Label>
              <Select
                defaultValue={data.teacherId.toString()}
                // value={data.teacherId ? data.teacherId.toString() : ''}
                onValueChange={handleTeacherChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a teacher" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher.user.id} value={teacher.user.id.toString()}>
                      {teacher.user?.fullName || 'Unknown Teacher'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.teacherId && (
                <p className="text-sm text-red-500">{convertToCapitalizedWords(errors.teacherId)}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={processing} className='mt-3'>
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}