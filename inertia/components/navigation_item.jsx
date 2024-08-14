import { Button } from '@/components/ui/button'

import { Link } from '@inertiajs/react'

const NavigationItem = ({ route, label, icon }) => (
  <Link href={route}>
    <Button
      // variant={route().current(routeName) ? 'secondary' : 'ghost'}
      className="justify-start w-full"
    >
      {icon}
      <span className="ml-1 ">{label}</span>
    </Button>
  </Link>
)

export default NavigationItem
