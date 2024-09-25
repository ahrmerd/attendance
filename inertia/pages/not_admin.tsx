
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "@inertiajs/react"
import { AlertTriangle } from "lucide-react"

export default function NotAdminPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-yellow-500" aria-hidden="true" />
          </div>
          <CardTitle className="text-2xl font-bold">Access Denied</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You do not have system administrator privileges to access this area.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            If you believe this is an error, please contact your IT department for assistance.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button>
            <Link href="/">Return to Home</Link>
          </Button>
          {/* <Button variant="outline" asChild>
            <Link href="/contact-support">Contact Support</Link>
          </Button> */}
        </CardFooter>
      </Card>
    </div>
  )
}