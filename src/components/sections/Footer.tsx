import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="w-full max-w-4xl mx-auto py-8 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-center ">
        <p className="text-base text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear() } &nbsp;
    Rakesh patel | All Rights Reserved.
        </p>
      </footer>

    </div>
  )
}

export default Footer
