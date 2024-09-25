import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Head, Link } from '@inertiajs/react'
import { Bell, CheckCircle, Clock, Fingerprint, School, Shield } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Home</title>
        <meta name="description" content="Landing Page For SmartAttendance"/>
      </Head>
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <School className="h-6 w-6 mr-2" />
          <span className="font-bold">SmartAttend</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#how-it-works">
            How It Works
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#benefits">
            Benefits
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#contact">
            Contact
          </Link>
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Staff Login</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Smart School Attendance System
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Enhance student safety and parent peace of mind with our advanced biometric attendance system.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Key Features
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Fingerprint className="h-6 w-6 mb-2" />
                  <CardTitle>Biometric Verification</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Secure and accurate student identification using fingerprint technology.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Bell className="h-6 w-6 mb-2" />
                  <CardTitle>SMS Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Instant SMS alerts to parents when students enter or leave the school premises.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Shield className="h-6 w-6 mb-2" />
                  <CardTitle>Enhanced Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Improved campus safety with real-time tracking of student attendance.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              How It Works
            </h2>
            <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <li className="flex flex-col items-center text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </div>
                <h3 className="mt-4 font-semibold">Student Arrives</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Student reaches the school entrance.</p>
              </li>
              <li className="flex flex-col items-center text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  2
                </div>
                <h3 className="mt-4 font-semibold">Fingerprint Scan</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Student scans their fingerprint at the kiosk.</p>
              </li>
              <li className="flex flex-col items-center text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  3
                </div>
                <h3 className="mt-4 font-semibold">System Verification</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">The system verifies the student's identity.</p>
              </li>
              <li className="flex flex-col items-center text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  4
                </div>
                <h3 className="mt-4 font-semibold">SMS Notification</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Parents receive an SMS confirming their child's arrival.</p>
              </li>
            </ol>
          </div>
        </section>
        <section id="benefits" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Benefits
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Clock className="h-6 w-6 mb-2" />
                  <CardTitle>Real-time Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Parents stay informed about their child's whereabouts in real-time.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CheckCircle className="h-6 w-6 mb-2" />
                  <CardTitle>Improved Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Encourage punctuality and reduce truancy with accurate tracking.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Shield className="h-6 w-6 mb-2" />
                  <CardTitle>Enhanced Safety</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Ensure student safety with immediate alerts and accurate records.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Enhance Your School's Safety?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Contact us today to learn more about implementing SmartAttend in your school.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button className="w-full">Contact Us</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 SmartAttend. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
