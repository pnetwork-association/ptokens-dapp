import { useNavigate } from 'react-router-dom'  

import NavbarItem from '../molecules/NavbarItems'

const Navbar = (): JSX.Element => {
  const navigate = useNavigate()
  return (
    <div role='navbar' className='navbar bg-base-100'>
      <img className="w-8 mr-2" src="/svg/PNT.svg" />
      <NavbarItem onclick={() => navigate('/swap')} label='swap'>Swap</NavbarItem>
      <NavbarItem onclick={() => navigate('/risks')} label='risks'>Risks</NavbarItem>
    </div>
  )
}

export default Navbar