import { useNavigate } from 'react-router-dom'  

import NavbarItem from '../molecules/NavbarItems'
import Profile from '../../app/wallet/evm-chains/Profile'

const Navbar = (): JSX.Element => {
  const navigate = useNavigate()
  return (
    <div role='navbar' className='navbar bg-base-100'>
      <div className="flex-1">
        <img className="w-8 mr-2" src="/svg/PNT.svg" />
        <NavbarItem onclick={() => navigate('/swap')} label='swap'>Swap</NavbarItem>
        <NavbarItem onclick={() => navigate('/risks')} label='risks'>Risks</NavbarItem>
      </div>
      <div className="flex-none">
        <Profile />
      </div>
    </div>
  )
}

export default Navbar