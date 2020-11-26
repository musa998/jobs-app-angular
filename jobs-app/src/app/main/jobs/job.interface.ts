import {User} from "@app/core/models/user";

export interface Job {
    id?: number;
    title: string;
    content: string;
    publishDate: string;
    category: string;
    companyName: string;
    location: string;
    salary: number;
    likesCount: number;
    applicants: User[];
    companyId?: string; 
  }
  