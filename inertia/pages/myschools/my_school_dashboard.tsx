import DashboardController from "#controllers/dashboard_controller";
import { BarchartChart, LinechartChart } from "@/components/chart_components";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SchoolLayout from "@/layouts/school_layout";
import { InferPageProps } from "@adonisjs/inertia/types";
import { Link } from '@inertiajs/react';
export default function MySchoolDashboard(props: InferPageProps<DashboardController, 'schoolDashboard'>) {
    console.log(props);
    const students = props.students.length;
    const staff = props.staff.length;
    const classes = props.classes.length;
    return <>
        <SchoolLayout>
            <main className="grid gap-8 p-4 sm:p-6">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                <Card>
              <CardHeader className="pb-3">
                <CardTitle>Students</CardTitle>
                <CardDescription>Total number of Students in the system.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{students}</div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">
                  <Link href="/myschools/students">Manage Students</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Classes</CardTitle>
                <CardDescription>Total number of Classes in the system.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{classes}</div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">
                  <Link href="/myschools/classes">Manage Classes</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Staff</CardTitle>
                <CardDescription>Total number of Staff in the system.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{staff}</div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">
                  <Link href="/myschools/roles">Manage Staff</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Guardians</CardTitle>
                <CardDescription>Total number of Guardians in the system.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{students*2}</div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">
                 Manage Guardians
                </Button>
              </CardFooter>
            </Card>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Student Enrollment</CardTitle>
                            <CardDescription>A bar chart showing student enrollment over the last 6 months.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <BarchartChart className="aspect-[16/9]" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Class Attendance</CardTitle>
                            <CardDescription>A line chart showing class attendance over the last 6 months.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <LinechartChart className="aspect-[16/9]" />
                        </CardContent>
                    </Card>
                </div>
            </main>
        </SchoolLayout>
    </>
}
