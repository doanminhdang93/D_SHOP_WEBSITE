import React from 'react'
import styles from '../../styles/styles'
import { navItems } from '../../static/data'
import { Link } from 'react-router-dom'

const NavBar = ({active}) => {
  return (
    <div className={`${styles.noramFlex}`}>
        {
            navItems && navItems.map((i,index) => (
                <div className='flex' key={index}>
                    <Link to={i.url} 
                        className={`${active === index + 1 ? "text-[#ffce6f]" : "text-[#fff]"} text-lg font-[500] px-6 cursor-pointer}`}
                    >
                        {i.title}
                    </Link>
                </div>
            ))
        }
    </div>
  )
}

export default NavBar;