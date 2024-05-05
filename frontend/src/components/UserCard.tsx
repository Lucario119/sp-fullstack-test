"use client"
import { UserDataProps } from '@/types/User';

interface IUserCardItemProps {
  userData: UserDataProps;
}

export function UserCard({userData}: IUserCardItemProps) {
  return (
    <div className="flex flex-col gap-2 border-[1px] border-black p-3 lg:w-[15rem] md:[14rem]">
      <span>
       <strong>Name: </strong>
       <p>{userData.name}</p>
      </span>
      <span>
       <strong>City: </strong>
       <p>{userData.city}</p>
      </span>
      <span>
            
       <strong>Country: </strong>
      
       <p>{userData.country}</p>
 
      </span>
      <span>
       <strong>Favorite Sport: </strong>
       <p>{userData.favorite_sport}</p>
      </span>

    </div>
  );
}

