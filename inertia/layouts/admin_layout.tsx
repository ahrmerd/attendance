import User from '#models/user'
import { UserAvatar } from '@/components/icons'
import { Sidebar } from '@/components/sidebar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ThemeToggle, useTheme } from '@/contexts/theme_context'
import { Link, usePage } from '@inertiajs/react'
import { MenuIcon } from 'lucide-react'
import { ReactNode } from 'react'

interface AdminLayoutProps {
  children: ReactNode
}
export default function AdminLayout({ children }: AdminLayoutProps) {
  const user: User = usePage().props.auth as User
  const theme = useTheme()
  // const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)

  return (
    <div className="flex flex-col w-full min-h-screen bg-muted/40 dark:bg-gray-950">
      <header className="flex items-center justify-between h-16 px-6 border-b dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center gap-4">
          <Link className="flex items-center gap-2" href="dashboard">
            {/* <ApplicationLogo className="w-6 h-6 text-gray-900 dark:text-gray-50" /> */}
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-50">
              Attendance
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/myschools/dashboard">
            <Button>School Management</Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" size="icon" variant="ghost">
                <UserAvatar />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user.fullName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="l">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>
                <ThemeToggle />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="logout" method="post" as="button">
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-1">
        <nav className="hidden min-h-full p-6 border-r w-60 shrink-0 dark:border-gray-800 md:block">
          <Sidebar />
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="rounded-full" size="icon" variant="ghost">
                <MenuIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Toggle navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>
        <main className="flex flex-col flex-1 mt-5 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
