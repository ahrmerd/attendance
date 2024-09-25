import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "@inertiajs/react"
import { AlertCircle } from "lucide-react"

export default function NotAssociatedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-12 w-12 text-orange-500" aria-hidden="true" />
          </div>
          <CardTitle className="text-2xl font-bold">School Association Required</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You are not currently associated with any school in our system.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            To access this feature, you need to be linked to a registered school. Please contact your school administrator or our support team for assistance.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <Button asChild>
            <Link href="/login">Go to Dashboard</Link>
          </Button>
          
        </CardFooter>
      </Card>
    </div>
  )
}