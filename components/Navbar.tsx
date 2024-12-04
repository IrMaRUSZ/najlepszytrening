'use client'
import Link from 'next/link'
import { useState } from 'react'
import styles from '../styles/Navbar.module.css'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className={styles.nav}>
      <div className={styles.wrapper}>
      <Link href="/" className={styles.brand}>
          <span className={styles.brandFirst}>Najlepszy</span>
          <span className={styles.brandSecond}>Trening</span>
        </Link>

        <ul className={styles.menu}>
          <li><Link href="/o-mnie">O mnie</Link></li>
          <li><Link href="/trener-personalny-lodz">Trener</Link></li>
          <li><Link href="/Wspolpraca-online">Współpraca-online</Link></li>
          <li><Link href="/kontakt">Kontakt</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/narzedzia">Narzędzia</Link></li>
        </ul>

        <button 
          className={styles.mobileButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isOpen && (
          <div className={styles.mobileMenu}>
            <Link href="/o-mnie" onClick={() => setIsOpen(false)}>O mnie</Link>
            <Link href="/trener-personalny-lodz" onClick={() => setIsOpen(false)}>Trener</Link>
            <Link href="/treningi-online" onClick={() => setIsOpen(false)}>Online</Link>
            <Link href="/kontakt" onClick={() => setIsOpen(false)}>Kontakt</Link>
            <Link href="/blog" onClick={() => setIsOpen(false)}>Blog</Link>
            <Link href="/narzedzia" onClick={() => setIsOpen(false)}>Narzędzia</Link>
          </div>
        )}
      </div>
    </nav>
  )
}