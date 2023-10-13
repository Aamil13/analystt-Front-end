

interface sortInterface{
  handleSort:any,
  handleClearSort:any,
  sortValue:string,
  handleSearch:any,
  handleClearSearch:any,
  searchValue:string
}

const SortSearch = ({handleSort, handleClearSort, sortValue, handleSearch, handleClearSearch, searchValue}:sortInterface) => {
  return (
    <div className='bg-white rounded-lg px-4 md:px-10 py-5 shadow mb-4'>
        <div className='flex justify-between flex-wrap'>
            <div className='w-full md:w-1/2 pr-4'>
                <div>
                <p>Sort By:</p>
                </div>
            <div className='flex'>
            <select className="select select-error w-full" onChange={handleSort} value={sortValue}>
            <option disabled selected>Select property to sort.</option>
            <option></option>
            <option>Name</option>
            <option>City</option>
            <option>Street</option>
            </select>
            <button className='btn bg-red-500' onClick={handleClearSort}>Clear</button>
            </div>
            
            </div>
            <div className='w-full md:w-1/2 pl-4'>
            <div>
            <p>Search by Name or City:</p>
            </div>
            <div className='flex'>
            <input type="text" placeholder="Type here" className="input input-bordered input-error w-full" onChange={handleSearch} value={searchValue}/>
            <div className='flex'>
            <button className='btn bg-red-500' onClick={handleClearSearch}>Clear</button>
            </div>
            </div>
            
            </div>
        </div>
    </div>
  )
}

export default SortSearch