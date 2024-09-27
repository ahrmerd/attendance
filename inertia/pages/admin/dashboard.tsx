import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import AdminLayout from '@/layouts/admin_layout'
// import { TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
// import router from '@adonisjs/core/services/router'
import DashboardController from '#controllers/dashboard_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head, Link } from '@inertiajs/react'
// import { Table, Badge } from 'lucide-react'

// interface DashboardProps {
//   version: number
// }

export default function Dashboard(props: InferPageProps<DashboardController, 'index'>) {
  const schools = props.schools
  const roles = props.roles
  const users = props.users
  const version = props.version

  return (
    <>
      <Head title="Homepage" />
      <AdminLayout>
        <main className="grid items-start flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Schools</CardTitle>
                <CardDescription>Total number of schools in the system.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{schools}</div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">
                  <Link href="/schools">Manage Schools</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Active Users</CardTitle>
                <CardDescription>Total number of active users in the system.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{users}</div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">
                  <Link href="/users">Manage Users</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Pending Requests</CardTitle>
                <CardDescription>Total number of pending requests in the system.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">72</div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Review Requests</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Roles</CardTitle>
                <CardDescription>Total number of roles in the system.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{roles}</div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">
                  <Link href="/roles">Manage Roles</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="grid gap-4">
            <Card></Card>
          </div>
        </main>
      </AdminLayout>
    </>
  )
}
