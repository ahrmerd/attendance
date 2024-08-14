import AdminLayout from '@/layouts/admin_layout'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
// import router from '@adonisjs/core/services/router'
import { Head, Link, router } from '@inertiajs/react'
import { Table, Badge } from 'lucide-react'
interface DashboardProps {
  version: number
}

export default function Dashboard(props: DashboardProps) {
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
                <div className="text-4xl font-bold">125</div>
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
                <div className="text-4xl font-bold">3,450</div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Manage Users</Button>
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
                <div className="text-4xl font-bold">15</div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Manage Roles</Button>
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
