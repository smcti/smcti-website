import navItems from '@public/data/navItems.json';

const Nav = () => {
  return (
    <nav className='w-full bg-cello-800 text-white'>
        <div className='flex flex-row justify-between max-w-6xl bg-red-400 mx-auto my-0 h-16 p-2'>
            <div className='h12'>
                <img className='h-full' 
                    src='/assets/icons/logo-secretaria-white.svg'
                    alt="Logo secretaria de CTI" />
            </div>
            <ul className='flex flex-row gap-4'>
                {
                    Object.values(navItems.pt).map((item) => (
                        <li className='h-fit'><a href={item.path}>{item.name}</a></li>
                    ))
                }
            </ul>
        </div>
    </nav>
  )
}

export default Nav