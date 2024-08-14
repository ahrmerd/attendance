import { Button } from '@/components/ui/button'
import { Link, router, usePage } from '@inertiajs/react'
import { Telescope, SchoolIcon, MenuIcon, XIcon } from 'lucide-react'
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/ui/dropdown-menu'
import { SheetTrigger, SheetContent, Sheet } from '@/components/ui/sheet'
import { UserAvatar } from '@/components/icons'
import { Sidebar } from '@/components/sidebar'
import { ReactNode } from 'react'
import User from '#models/user'

interface AdminLayoutProps {
  children: ReactNode
}
export default function AdminLayout({ children }: AdminLayoutProps) {
  const user: User = usePage().props.auth as User
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
          {/* <div className="relative max-w-md">
                    <SearchIcon className="absolute w-5 h-5 text-gray-500 -translate-y-1/2 left-3 top-1/2 dark:text-gray-400" />
                    <Input
                        className="w-full h-10 pl-10 text-sm bg-gray-100 border border-gray-200 rounded-md focus:border-gray-900 focus:bg-white focus:outline-none dark:border-gray-800 dark:bg-gray-800 dark:text-gray-50 dark:focus:border-gray-50"
                        placeholder="Search lectures"
                        type="search"
                    />
                </div> */}
        </div>
        <div className="flex items-center gap-4">
          {/* <Button className="rounded-full" size="icon" variant="ghost">
                    <BellIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <span className="sr-only">Notifications</span>
                </Button> */}
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
