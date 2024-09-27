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
import axios from 'axios'
import { FormEvent, useState } from 'react'

interface CreateRoleModalProps {
  isOpen: boolean
  onClose: () => void
}

interface User {
  id: number
  fullName: string
}

interface School {
  id: number
  name: string
}

export default function CreateRoleModal({ isOpen, onClose }: CreateRoleModalProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    userId: '',
    role: '',
    schoolId: '',
  })

  const [userSearchQuery, setUserSearchQuery] = useState('')
  const [schoolSearchQuery, setSchoolSearchQuery] = useState('')
  const [userResults, setUserResults] = useState<User[]>([])
  const [schoolResults, setSchoolResults] = useState<School[]>([])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post('/roles', {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        reset()
        onClose()
      },
    })
  }

  const searchUsers = async (query: string) => {
    if (query.length >= 3) {
      try {
        const response = await axios.get(`/users/search?q=${query}`)
        setUserResults(response.data.slice(0, 5))
      } catch (error) {
        console.error('Error searching users:', error)
      }
    } else {
      setUserResults([])
    }
  }

  const searchSchools = async (query: string) => {
    if (query.length >= 3) {
      try {
        const response = await axios.get(`/schools/search?q=${query}`)
        setSchoolResults(response.data.slice(0, 5))
      } catch (error) {
        console.error('Error searching schools:', error)
      }
    } else {
      setSchoolResults([])
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Role</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid items-center w-full gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="userId">User</Label>
              <Input
                type="text"
                value={userSearchQuery}
                onChange={(e) => {
                  setUserSearchQuery(e.target.value)
                  searchUsers(e.target.value)
                }}
                placeholder="Search for a user"
              />
              {userResults.length > 0 && (
                <Select value={data.userId} onValueChange={(value) => setData('userId', value)}>
                  <SelectTrigger id="userId">
                    <SelectValue placeholder="Select a user" />
                  </SelectTrigger>
                  <SelectContent>
                    {userResults.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {errors.userId && (
                <p className="text-sm text-red-500">{convertToCapitalizedWords(errors.userId)}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="role">Role</Label>
              <Select value={data.role} onValueChange={(value) => setData('role', value)}>
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="schoolId">School</Label>
              <Input
                type="text"
                value={schoolSearchQuery}
                onChange={(e) => {
                  setSchoolSearchQuery(e.target.value)
                  searchSchools(e.target.value)
                }}
                placeholder="Search for a school"
              />
              {schoolResults.length > 0 && (
                <Select value={data.schoolId} onValueChange={(value) => setData('schoolId', value)}>
                  <SelectTrigger id="schoolId">
                    <SelectValue placeholder="Select a school" />
                  </SelectTrigger>
                  <SelectContent>
                    {schoolResults.map((school) => (
                      <SelectItem key={school.id} value={school.id.toString()}>
                        {school.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {errors.schoolId && (
                <p className="text-sm text-red-500">{convertToCapitalizedWords(errors.schoolId)}</p>
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
