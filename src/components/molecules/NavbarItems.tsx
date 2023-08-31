import { PropsWithChildren } from 'react'

type NavbarItemProps = {
  onclick: () => void
  label: string
}

const NavbarItem = ({onclick, label, children}: PropsWithChildren<NavbarItemProps>): JSX.Element => {
  const testLabel = `goto-${label}`
  return(
    <a className="btn btn-ghost normal-case text-xl mr-1" onClick={onclick} aria-label={testLabel}>
      {children}
    </a>
  )
}

export default NavbarItem