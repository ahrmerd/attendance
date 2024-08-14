import { Button } from '@/components/ui/button'
import { Head, Link } from '@inertiajs/react'
import AdminLayout from '@/layouts/admin_layout'
import GuestLayout from '@/layouts/guest_layout'

export default function Home(props: { version: number }) {
  return (
    <>
      <Head title="Homepage" />
      <GuestLayout>
        <div className="container text-2xl">
          <div className="title">AdonisJS {props.version} x Inertia x React</div>

          <span>
            Learn more about AdonisJS and Inertia.js by visiting the{' '}
            <a href="https://docs.adonisjs.com/guides/inertia">AdonisJS documentation</a>.
            <div className="flex gap-5">
              <Link href="/login">
                <Button>Login</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </div>
          </span>
        </div>
      </GuestLayout>
    </>
  )
}
