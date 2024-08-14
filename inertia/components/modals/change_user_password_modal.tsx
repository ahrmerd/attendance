import React, { ChangeEvent, FormEvent } from 'react'
import { useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import User from '#models/user'
import { DialogDescription } from '@radix-ui/react-dialog'
import { convertToCapitalizedWords } from '@/lib/utils'
import { BadgeXIcon, VerifiedIcon } from 'lucide-react'
// import User from '#models/user'

interface ChangeUserPasswordModalProps {
  isOpen: boolean
  onClose: () => void
  user: User
}

export default function ChangeUserPasswordModal({
  isOpen,
  onClose,
  user,
}: ChangeUserPasswordModalProps) {
  const { data, setData, put, processing, errors, reset } = useForm({
    password: '',
    password_confirmation: '',
  })

  const changeName = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    put(`/users/${user.id}/password`, {
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
            Edit User:
            <span>{user.fullName}</span>
          </DialogTitle>
          {/* <DialogDescription></DialogDescription> */}
        </DialogHeader>
        <p>
          <span>Email</span>
          {user.email}
        </p>
        <p>
          <span>Name</span>
          {user.fullName}
        </p>
        <p>
          <span>Email</span>
          {user.phone}
        </p>
        <p>{user.isSystemAdmin ? <VerifiedIcon /> : <BadgeXIcon />}</p>
        <form onSubmit={changeName}>
          <div className="grid items-center w-full gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{convertToCapitalizedWords(errors.password)}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password_confirmation">Confirm Password</Label>
              <Input
                id="password_confirmation"
                type="password"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
              />
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
