import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Users2Icon, BookIcon } from "lucide-react";
import SchoolLayout from "@/layouts/school_layout";
import { BarchartChart, LinechartChart } from "@/components/chart_components";
export default function MySchoolDashboard() {
    return <>
        <SchoolLayout>
            <main className="grid gap-8 p-4 sm:p-6">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex items-center justify-between">
                            <CardTitle>Total Students</CardTitle>
                            <Users2Icon />
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">1,234</div>
                            <p className="text-sm text-muted-foreground">+5.2% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex items-center justify-between">
                            <CardTitle>Total Classes</CardTitle>
                            <BookIcon />
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">78</div>
                            <p className="text-sm text-muted-foreground">+2.1% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex items-center justify-between">
                            <CardTitle>Total Guardians</CardTitle>
                            <Users2Icon />

                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">987</div>
                            <p className="text-sm text-muted-foreground">+3.8% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex items-center justify-between">
                            <CardTitle>Total Teachers</CardTitle>
                            <Users2Icon />

                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">145</div>
                            <p className="text-sm text-muted-foreground">+1.4% from last month</p>
                        </CardContent>
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
                <Tabs defaultValue="students">
                    <TabsList>
                        <TabsTrigger value="students">Students</TabsTrigger>
                        <TabsTrigger value="classes">Classes</TabsTrigger>
                        <TabsTrigger value="guardians">Guardians</TabsTrigger>
                        <TabsTrigger value="teachers">Teachers</TabsTrigger>
                    </TabsList>
                    <TabsContent value="students">
                        <Card>
                            <CardHeader>
                                <CardTitle>Add Student</CardTitle>
                                <CardDescription>Fill out the form to add a new student to the school.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="student-name">Name</Label>
                                        <Input id="student-name" placeholder="Enter student name" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="student-email">Email</Label>
                                        <Input id="student-email" type="email" placeholder="Enter student email" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="student-grade">Grade</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select grade" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">Grade 1</SelectItem>
                                                <SelectItem value="2">Grade 2</SelectItem>
                                                <SelectItem value="3">Grade 3</SelectItem>
                                                <SelectItem value="4">Grade 4</SelectItem>
                                                <SelectItem value="5">Grade 5</SelectItem>
                                                <SelectItem value="6">Grade 6</SelectItem>
                                                <SelectItem value="7">Grade 7</SelectItem>
                                                <SelectItem value="8">Grade 8</SelectItem>
                                                <SelectItem value="9">Grade 9</SelectItem>
                                                <SelectItem value="10">Grade 10</SelectItem>
                                                <SelectItem value="11">Grade 11</SelectItem>
                                                <SelectItem value="12">Grade 12</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button type="submit">Add Student</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="classes">
                        <Card>
                            <CardHeader>
                                <CardTitle>Add Class</CardTitle>
                                <CardDescription>Fill out the form to add a new class to the school.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="class-name">Name</Label>
                                        <Input id="class-name" placeholder="Enter class name" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="class-grade">Grade</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select grade" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">Grade 1</SelectItem>
                                                <SelectItem value="2">Grade 2</SelectItem>
                                                <SelectItem value="3">Grade 3</SelectItem>
                                                <SelectItem value="4">Grade 4</SelectItem>
                                                <SelectItem value="5">Grade 5</SelectItem>
                                                <SelectItem value="6">Grade 6</SelectItem>
                                                <SelectItem value="7">Grade 7</SelectItem>
                                                <SelectItem value="8">Grade 8</SelectItem>
                                                <SelectItem value="9">Grade 9</SelectItem>
                                                <SelectItem value="10">Grade 10</SelectItem>
                                                <SelectItem value="11">Grade 11</SelectItem>
                                                <SelectItem value="12">Grade 12</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="class-teacher">Teacher</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select teacher" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">John Doe</SelectItem>
                                                <SelectItem value="2">Jane Smith</SelectItem>
                                                <SelectItem value="3">Michael Johnson</SelectItem>
                                                <SelectItem value="4">Emily Davis</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button type="submit">Add Class</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="guardians">
                        <Card>
                            <CardHeader>
                                <CardTitle>Add Guardian</CardTitle>
                                <CardDescription>Fill out the form to add a new guardian to the school.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="guardian-name">Name</Label>
                                        <Input id="guardian-name" placeholder="Enter guardian name" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="guardian-email">Email</Label>
                                        <Input id="guardian-email" type="email" placeholder="Enter guardian email" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="guardian-phone">Phone</Label>
                                        <Input id="guardian-phone" type="tel" placeholder="Enter guardian phone" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="guardian-student">Student</Label>
                                        <Select >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select student" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">John Doe</SelectItem>
                                                <SelectItem value="2">Jane Smith</SelectItem>
                                                <SelectItem value="3">Michael Johnson</SelectItem>
                                                <SelectItem value="4">Emily Davis</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button type="submit">Add Guardian</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="teachers">
                        <Card>
                            <CardHeader>
                                <CardTitle>Add Teacher</CardTitle>
                                <CardDescription>Fill out the form to add a new teacher to the school.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="teacher-name">Name</Label>
                                        <Input id="teacher-name" placeholder="Enter teacher name" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="teacher-email">Email</Label>
                                        <Input id="teacher-email" type="email" placeholder="Enter teacher email" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="teacher-subject">Subject</Label>
                                        <Input id="teacher-subject" placeholder="Enter teacher subject" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="teacher-class">Class</Label>
                                        <Select />
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </SchoolLayout>
    </>
}
