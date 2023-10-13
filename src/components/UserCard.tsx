import React, {useState} from 'react'

// export interface userType {
//     item:{
//         id:number,
//         name:string,
//         email:string,
//         phone:string,
//         address:{
//             city:string,
//             street:string,
//         },
//         website:string,
//         company:{
//             name:string,
//             catchPhrase:string,
//         }
//     }
// }
export interface UserType {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: {
      city: string;
      street: string;
    };
    website: string;
    company: {
      name: string;
      catchPhrase: string;
    };
  }
  
  interface UserCardProps {
    item: any;
  }
  

const UserCard:React.FC<UserCardProps> = ({item}) => {
    const [show, setShow] = useState<boolean>(false)

    const handleShow = () =>{
        setShow(!show)
    }

  return (
    <div className='bg-white rounded-lg px-4 md:px-10 py-5 shadow mb-4'>
    <div className='flex justify-between flex-wrap items-center'>
      <div className='w-full sm:w-1/2 md:w-1/5 mb-3'>
        <p>{item?.name}</p>
      </div>
      <div className='w-full sm:w-1/2 md:w-1/5 mb-3'>
        <p className='font-bold mb-2'>CONTACT</p>
        <p>{item?.phone}</p>
      </div>
      <div className='w-full sm:w-1/2 md:w-1/5 mb-3'>
      <p className='font-bold mb-2'>CITY</p>
        <p>{item?.address?.city}</p>
      </div>
      <div className='w-full sm:w-1/2 md:w-1/5 mb-3'>
      <p className='font-bold mb-2'>STREET</p>
        <p>{item?.address?.street}</p>
      </div>
      <div className='w-full sm:w-1/2 md:w-1/5 mb-3 flex justify-end'>
        <button className='btn btn-sm bg-red-600 text-white'
        onClick={handleShow}
        >
            {show ? "Hide Details" : "View Details"}
        </button>
      </div>
    </div>
    {show ? 
    <div className='mt-8 slide-top'>
    <hr></hr>
      <p className='font-bold mb-2'>Company Description</p>
      <p className=''>{item?.company?.catchPhrase}</p>
    <div className='flex justify-between flex-wrap items-center mt-5'>

<div className='w-full sm:w-1/3 mb-3'>
<div className='mb-3'>
  <p className='font-bold mb-2'>Contact Person</p>
  <p>{item?.name}</p>
</div>
<div className='mb-3'>
  <p className='font-bold mb-2'>Company</p>
  <p>{item?.company?.name}</p>
</div>
<div className='mb-3'>
  <p className='font-bold mb-2'>Emails</p>
  <p>{item?.email}</p>
</div>
<div className='mb-3'>
  <p className='font-bold mb-2'>Phones</p>
  <p>{item?.phone}</p>
</div>
</div>
<div className='w-full sm:w-1/2 mb-3'>
<div className='mb-3'>
  <p className='font-bold mb-2'>Address</p>
  <p>{item?.address?.street} {item?.address?.city}</p>
</div>
<div className='mb-3'>
  <p className='font-bold mb-2'>City</p>
  <p>{item?.address?.city}</p>
</div>
<div className='mb-3'>
  <p className='font-bold mb-2'>Street</p>
  <p>{item?.address?.street}</p>
</div>
<div className='mb-3'>
  <p className='font-bold mb-2'>Website</p>
  <p>{item?.website}</p>
</div>
</div>

</div>
    </div>
    : null }
    
    </div>
  )
}

export default UserCard