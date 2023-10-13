import {useState, useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../redux/useTypedSelector'
import { getUsers } from '../redux/reducers/userSlice'
import HomeHeader from '../components/HomeHeader'
import UserCard from '../components/UserCard'
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import { UserType } from '../components/UserCard'
import SortSearch from '../components/SortSearch'

const Home = () => {
    const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(getUsers())
    },[])

    const {loading, users, error} = useAppSelector((store)=> store.users)
    // console.log(loading, users, error)

    const [savedUsers, setSavedUsers] = useState<UserType[] | object[]>([])
    const [totalPage, setTotalPage] = useState<number>()
    const [currentPage, setCurrentPage] = useState(1);
    const [sortValue, setSortValue] = useState('')
    const [searchValue, setSearchValue] = useState('')

    useEffect(()=>{
      if(users?.length){
        let firstBatch = users;
        let sliced= firstBatch?.slice(0, 4);
        setSavedUsers(sliced)
        setTotalPage(Math.ceil(users?.length/4))
      }
    },[users])

    const handlePage = (e:number, clear=false) =>{
        setCurrentPage(e)
        let preUsers = users || [];
        let sliced = [];

        if(e > 0){
          let skip = (e-1)*4;
          let limit = skip + 4;
          sliced = preUsers?.slice(skip, limit)
          
          // setSavedUsers(sliced)
          if(sortValue && clear === false){
          sortHelper(sortValue, sliced)
          }else{
            setSavedUsers(sliced)
          }
        }
    }

    const sortHelper = (value:string, data:object[]) =>{
      let preData = data;
      if(value === 'Name'){
        // @ts-ignore
       preData = preData?.sort((a,b)=>a?.name?.toLowerCase().localeCompare(b?.name?.toLowerCase()))
        setSavedUsers(preData)
      }else if(value === "City"){
        // @ts-ignore
        preData = preData?.sort((a,b)=>a?.address?.city?.toLowerCase().localeCompare(b?.address?.city?.toLowerCase()))
        setSavedUsers(preData)
      }else if(value === "Street"){
        // @ts-ignore
        preData = preData?.sort((a,b)=>a?.address?.street?.toLowerCase().localeCompare(b?.address?.street?.toLowerCase()))
        setSavedUsers(preData)
      }
    }

    const handleSort = (event :React.ChangeEvent<HTMLSelectElement>)=>{
      let value = event.target.value  
      setSortValue(value)
      sortHelper(value, savedUsers)
    }
    const handleClearSort = () =>{
        handlePage(currentPage, true)
        setSortValue('')
    }
    const handleSearch = (event :React.ChangeEvent<HTMLInputElement>)=>{
      let value = event.target.value 
      setSearchValue(value)
      let prevData = users;
      if(value === ''){
        handlePage(1)
      }else{
      // @ts-ignore
      let newData = prevData.filter(x => (x?.name?.toLowerCase().includes(value?.toLowerCase()) || x?.address?.city?.toLowerCase().includes(value?.toLowerCase())) )
      
      if(newData?.length){
        setSavedUsers(newData)
        // setCurrentPage(1)
        // setTotalPage(Math.ceil(newData?.length/4))
      }
    }
    }

    const handleClearSearch = () =>{
      setSearchValue('')
      handlePage(1)
    }

    // useEffect(()=>{

    // },[searchValue])


  return (
    <div className='p-4 md:p-8'>
      <HomeHeader/>
      <SortSearch handleSort={handleSort} handleClearSort={handleClearSort} sortValue={sortValue}
      handleSearch={handleSearch}
      handleClearSearch={handleClearSearch}
      searchValue={searchValue}
      />
      {loading ?
      <div className='flex justify-center items-center my-20'>
        <span className="loading loading-dots loading-lg"></span>
      </div>
      :
      savedUsers?.length ?  
        savedUsers?.map((item, index)=>(
        <UserCard key={index} item={item}/>
      ))
      :
      <h1 className='text-lg font-light text-red-600 text-center my-20'>Oops! something went wrong. Please try later.</h1>
    }
     
      {totalPage && searchValue == "" &&
      <div className='w-[300px] mx-auto my-5'>
      <ResponsivePagination
      current={currentPage}
      total={totalPage}
      onPageChange={(e)=>handlePage(e)}
    />
      </div>
      }
    </div>
  )
}

export default Home