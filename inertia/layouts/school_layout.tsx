/**
 * v0 by Vercel.
 * @see https://v0.dev/t/epdraLqQ0gy
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { BookIcon, LayoutDashboardIcon, MenuIcon, Users2, Users2Icon } from 'lucide-react'
import { SchoolSidebar } from '@/components/school_sidebar'
import { Sidebar } from '@/components/sidebar'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { ReactNode } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { ThemeToggle, useTheme } from '@/contexts/theme_context'
import User from '#models/user'
import { UserAvatar } from '@/components/icons'

interface SchoolLayoutProps {
  children: ReactNode
}
export default function SchoolLayout({ children }: SchoolLayoutProps) {
  const user: User = usePage().props.auth as User
  const theme = useTheme()
  return (
    <div className="flex flex-col w-full min-h-screen bg-muted/40 dark:bg-gray-950">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Button size="icon" variant="ghost" className="sm:hidden">
            <LayoutDashboardIcon />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <h1 className="text-lg font-bold sm:text-xl">School Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          {/* <div className="relative">

              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 sm:w-[200px] lg:w-[300px]"
              />
            </div> */}
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
          <SchoolSidebar />
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
              <SchoolSidebar />
            </SheetContent>
          </Sheet>
        </div>
        <main className="flex flex-col flex-1 mt-5 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
