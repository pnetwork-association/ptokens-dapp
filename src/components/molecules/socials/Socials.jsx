import React from 'react'
import { FaTelegram, FaTwitter } from 'react-icons/fa'
import './styles.css'
import { useSelector } from 'react-redux'
import { getLinks } from '../../../store/settings/settings.selectors'

export default function SocialLinks() {
  const links = useSelector(getLinks)
  return (
    <div className="social-div">
      <p className="social-container">
        <a href={links.github} className="github social">
          <img src="./assets/svg/github.svg" alt="" />
        </a>
        <a href={links['p.network']} className="social pnetwork">
          <img src="./assets/svg/PNT.svg" alt="" />
        </a>
        <a href={links.telegram} className="telegram social">
          <FaTelegram size={30} />
        </a>
        <a href={links.twitter} className="twitter social">
          <FaTwitter size={30} />
        </a>
      </p>
    </div>
  )
}
