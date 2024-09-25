import { Link, usePage } from '@inertiajs/react'
import {
  LayoutDashboardIcon,
  SchoolIcon,
  UsersIcon,
  WorkflowIcon
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  {
    routeName: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboardIcon />,
  },
  {
    routeName: 'schools',
    label: 'Schools',
    icon: <SchoolIcon />,
  },
  {
    routeName: 'users',
    label: 'Users',
    icon: <UsersIcon />,
  },
  {
    routeName: 'roles',
    label: 'Roles',
    icon: <WorkflowIcon />,
  },
]

export function Sidebar() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)
  const { url } = usePage()

  return (
    <div className="py-4">
      <div className="py-2 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.routeName}
            href={item.routeName}
            className={`flex items-center gap-4 px-3 py-2 transition-colors rounded-lg hover:bg-muted text-foreground ${
              url.includes( item.routeName) ? 'bg-blue-500 text-white' : ''
            }`}
          >
            {item.icon}
            <span className={isSidebarExpanded ? 'block' : 'sr-only'}>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}