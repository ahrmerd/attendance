import User from '#models/user'
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
import { convertToCapitalizedWords } from '@/lib/utils'
import { useForm } from '@inertiajs/react'
import { BadgeXIcon, VerifiedIcon } from 'lucide-react'
import { FormEvent } from 'react'
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
            <span className='ml-3'>{user.fullName}</span>
          </DialogTitle>
          {/* <DialogDescription></DialogDescription> */}
        </DialogHeader>
        <p>
          <span className='font-bold'>Email:</span>
          <span className='ml-1'>{user.email}</span>
        </p>
        {/* <p>
          <span>Email</span>
          {user.phone}
        </p> */}
        <p>{user.isSystemAdmin ? <VerifiedIcon /> : <BadgeXIcon />}</p>
        <form onSubmit={changeName}>
          <div className="grid items-center w-full gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className='font-bold'>Name:</Label>
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
              <Label htmlFor="phone" className='font-bold'>Phone:</Label>
              <Input
                id="phone"
                value={data.phone}
                onChange={(e) => setData('phone', e.target.value)}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{convertToCapitalizedWords(errors.phone)}</p>
              )}
            </div>
            <div className="flex">
              <Label htmlFor="sysad" className="text-right mr-3 mt-1">
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
