import { Interface } from "readline"

export interface Post {
    author: Author
    comments: any[]
    likes : any[]
    content: string
    createdAt: string
    id: string
    picture: string
    updatedAt: string
  }



  export interface Author {
    id: string, 
    email : string, 
    username: string,
    profile : Profile
  }

  export interface Profile {
    profilePicture : string
    status : string ,
    bio : string ,
    gender : string ,
    user : Author
  }