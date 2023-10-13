
const HomeHeader = () => {
  return (
    <div className='flex flex-wrap justify-between px-4 md:px-20 items-center bg-white shadow rounded-lg mb-10'>
        <div className=''>
          <h1 className='text-6xl font-bold'>
            User Directory.
          </h1>
          <h4 className='text-red-500 text-4xl font-bold'>Get User Insight Information.</h4>
        </div>
        <div className=''>
          <img src='/header.png' className='h-[250px] rounded-full shadow-lg' alt='logo'/>
        </div>
      </div>
  )
}

export default HomeHeader