import React from 'react'
import { FaTelegram, FaTwitter } from 'react-icons/fa'
import settings from '../../../settings'
import './styles.css'

export default function SocialLinks() {
  return (
    <div className="social-div">
      <p className="social-container">
        <a href={settings.links['p.network']} className="social pnetwork">
          <img src="./assets/svg/PNT.svg" alt="" />
        </a>
        <a href={settings.links.telegram} className="telegram social">
          <FaTelegram size={30} />
        </a>
        <a href={settings.links.twitter} className="twitter social">
          <FaTwitter size={30} />
        </a>
      </p>
    </div>
  )
}
