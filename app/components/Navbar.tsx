'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const path : string = usePathname();

  return (
    <nav className='sticky top-0 bg-zinc-950 w-full z-50'>
      <div className='flex justify-between items-center px-4 md:px-8 border-b border-zinc-700'>
        <span className="sm:hidden"><Link href="/">pp</Link></span>
        <span className="hidden sm:inline"><Link href="/">PeerProducts</Link></span>
        <div className='flex gap-6'>
          <Link href='/' className={`py-2 + ${path === '/' ? 'border-b-2 border-white' : ''}`} >
              Home
          </Link>
          <Link href='/create' className={`py-2 + ${path === '/create' ? 'border-b-2 border-white' : ''}`}>
              Create
          </Link>
          <Link href='/reccs' className={`py-2 + ${path === '/reccs' ? 'border-b-2 border-white' : ''}`}>
              My Reccs
          </Link>
          <Link href='/profile' className={`py-2 + ${path === '/profile' ? 'border-b-2 border-white' : ''}`}>
              Profile
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
