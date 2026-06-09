import React from 'react'

const Navbar = () => {
    return (
       <nav className='text-white relative h-16 flex items-center justify-between px-4'>

  {/* Logo */}
  <div className="logo flex items-center md:text-2xl font-bold text-xl">
    <span className='text-purple-700'>&lt;</span>
    Pass
    <span className='text-purple-700'>OP/&gt;</span>
  </div>

  {/* Center Nav */}
  {/* <ul className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4 font-bold items-center'>
    <li className='border-3 p-2 rounded-2xl hover:scale-90 hover:bg-[#251256] transition-all duration-300'>
      <a href="">Home</a>
    </li>

    <li className='border-3 p-2 rounded-2xl hover:scale-90 hover:bg-[#251256] transition-all duration-300'>
      <a href="">About</a>
    </li>
  </ul> */}

  {/* GitHub */}
  <a
    href="https://github.com/Vishishtgoyal1432"
    target="_blank"
    rel="noreferrer"
    className="text-purple-400 hover:text-purple-300 hover:scale-110 transition-all duration-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.11.78-.25.78-.55v-2.15c-3.2.69-3.88-1.35-3.88-1.35-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a10.9 10.9 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.09 0 4.43-2.71 5.41-5.29 5.69.42.36.79 1.08.79 2.18v3.23c0 .3.21.67.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/>
    </svg>
  </a>

</nav>   
    )
}

export default Navbar
