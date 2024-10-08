import React from 'react'
import { motion } from 'framer-motion';
import { socials } from '../index.js';
import styles from '../index.js'
import { footerVariants } from '../utils/motion';
import '../index.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
  >
    <div className="footer-gradient" />
    <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
      <div className="flex items-center justify-between flex-wrap gap-5">
        <h4 className="font-bold md:text-[64px] text-[44px] text-white">
          Where Ideas Evolve
        </h4>

        <button type="button" className="flex items-center h-fit py-4 px-6 bg-[#25618B] rounded-[32px] gap-[12px]">
          <img
            src="/headset.png"
            alt="headset"
            className="w-[24px] h-[24px] object-contain"
          /> 
          <Link to = "/room">
          <span className="font-normal text-[16px] text-white">
                Enter LinkUp-Where Ideas Evolve
          </span></Link>
        </button>
      </div>

      <div className="flex flex-col">
        <div className="mb-[50px] h-[2px] bg-white opacity-10" />

        <div className="flex items-center justify-between flex-wrap gap-4">
          <h4 className="font-extrabold text-[24px] text-white">
            LinkUp
          </h4>
          <p className="font-normal text-[14px] text-white opacity-50">
            Copyright © 2024 - 2025 LinkUp. All rights reserved.
          </p>

          <div className="flex gap-4">
             {socials.map((social) => (
              <img
                key={social.name}
                src={social.url}
                alt={social.name}
                className="w-[24px] h-[24px] object-contain cursor-pointer"
              /> 
             ))} 
          </div>
        </div>
      </div>
    </div>
  </motion.footer>
    </div>
  )
}

export default Footer

