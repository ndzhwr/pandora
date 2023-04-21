import { FC } from 'react'
import Img from '../../assets/images/image.jpg'

interface MediumPersonProps {
    profile_picture: string,
    username: string,
    bio: string,
    id: string
}
const MediumPersonShower: FC<MediumPersonProps> = (data: MediumPersonProps) => {
    return (
        <div className='px-6 h-auto  bg-white py-4 hover:shadow-sm  border border-semi w-36'>
            <div className="img w-fit h-fit mx-auto">
                <img src={data.profile_picture} alt="" className='w-14 h-14 rounded-full object-cover bg-semi'/>
            </div>
            <p className='text-demi text-center text-sm '>@{data.username}</p>
            <p className='text-[12px]  text-center'>{data.bio} </p>
            <div className="mx-auto w-fit h-fit  mt-2">
                <button className="px-4 py-1 rounded-md bg-blue-900 text-white text-sm">
                    Follow
                </button>
            </div>
        </div>
    )
}


export default MediumPersonShower