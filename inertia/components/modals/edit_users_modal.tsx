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
import { Switch } from '../ui/switch'
// import User from '#models/user'

interface EditUserModalProps {
  isOpen: boolean
  onClose: () => void
  user: User
}

export default function EditUserModal({ isOpen, onClose, user }: EditUserModalProps) {
  const { data, setData, put, processing, errors, reset } = useForm({
    fullName: user.fullName,
    isSystemAdmin: user.isSystemAdmin,
    phone: user.phone ?? '',
  })

  const changeName = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    put(`/users/${user.id}`, {
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
          <span>Email</span>
          {user.phone}
        </p>
        <p>{user.isSystemAdmin ? <VerifiedIcon /> : <BadgeXIcon />}</p>
        <form onSubmit={changeName}>
          <div className="grid items-center w-full gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={data.fullName}
                onChange={(e) => setData('fullName', e.target.value)}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">{convertToCapitalizedWords(errors.fullName)}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={data.phone}
                onChange={(e) => setData('phone', e.target.value)}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{convertToCapitalizedWords(errors.phone)}</p>
              )}
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="sysad" className="text-right">
                System Admin Priveledges
              </Label>
              <Switch
                id="sysad"
                checked={data.isSystemAdmin}
                onCheckedChange={(checked: boolean) => setData('isSystemAdmin', checked)}
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
