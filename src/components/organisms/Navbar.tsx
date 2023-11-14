import { useNavigate } from 'react-router-dom'  

import NavbarItem from '../molecules/NavbarItems'
import Profile from '../../app/wallet/evm-chains/Profile'

const Navbar = (): JSX.Element => {
  const navigate = useNavigate()
  return (
    <>
    <div role='navbar' className='navbar bg-base-100 max-lg:hidden'>
      <div className="flex-1">
        <img className="w-8 mr-2" src="/svg/PNT.svg" />
        <NavbarItem onclick={() => navigate('/swap')} label='swap'>Swap</NavbarItem>
        <NavbarItem onclick={() => navigate('/risks')} label='risks'>Risks</NavbarItem>
      </div>
      <div className="flex-none">
        <Profile />
      </div>
    </div>
    <div className="navbar bg-base-100 lg:hidden">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 border border-base-300 rounded-box w-52">
            <li><a><NavbarItem onclick={() => navigate('/swap')} label='swap'>Swap</NavbarItem></a></li>
            <li><a><NavbarItem onclick={() => navigate('/risks')} label='risks'>Risks</NavbarItem></a></li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <img className="w-8 mr-2" src="/svg/PNT.svg" />
      </div>
      <div className="navbar-end">
        <Profile />
      </div>
    </div>
    </>
  )
}

export default Navbar