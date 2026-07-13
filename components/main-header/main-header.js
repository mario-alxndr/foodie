import Link from 'next/link'
import Image from 'next/image'

import logoImg from '@/assets/logo.png'
import classes from './main-header.module.css'

export default function MainHeader() {
  return (
    <header className={classes.header}>
      <Link href="/" className={classes.logo}>
        <Image src={logoImg.src} alt="Foodie Logo" priority width={24} height={24}/>
        NextLevel Food
      </Link>

      <nav className={classes.nav}>
        <ul>
          <li><Link href="/meals" className={classes.navLink}>
            Browse Meals
          </Link></li>
          <li><Link href="/community" className={classes.navLink}>
            Foodies Community
          </Link></li>
        </ul>
      </nav>
    </header>
  )
}
