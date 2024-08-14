import React, { FormEvent, useEffect, useState } from 'react'
import { Link, useForm } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import GuestLayout from '@/layouts/guest_layout'
// import Guest from './Guest'

export default function Login(props: { errors?: string[]; sss: string }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  })

  //   useEffect(() => {
  //     console.log(errors)
  //     console.log(props.errors)
  //     console.log(props.sss)
  //   }, [errors, props.errors])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    post('/login')
  }

  return (
    <GuestLayout>
      <div className="flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials to access your account.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="grid items-center w-full gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                  />
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit" disabled={processing}>
                {processing ? 'Logging in...' : 'Login'}
              </Button>
            </CardFooter>
          </form>
          <Link href="/register">
            <Button>Register</Button>
          </Link>
        </Card>
      </div>
    </GuestLayout>
  )
}
