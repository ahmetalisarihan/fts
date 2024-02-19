import React from 'react'

const Footer = () => {
  return (
    <footer className='py-10 border-t border-peach max-w-7xl m-auto'>
      Footer

            {/* Copyright text */}
            <p className="mt-8 text-center text-grey-600 text-sm">
            Copyright © {new Date().getFullYear()} AAS. All rights reserved.</p>
    </footer>
  )
}

export default Footer