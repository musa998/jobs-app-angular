import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Job} from './job.interface';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  url = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {
  }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.url);
  }

  getJob(id: number): Observable<Job> {
    const url = `${this.url}/${id}`;

    return this.http.get<Job>(url);
  }

  createJob(job: Job): Observable<any> {
    return this.http.post(this.url, job);
  }

  updateJob(job: Job): Observable<any> {
    const url = `${this.url}/${job.id}`;

    return this.http.put(url, job);
  }

  deleteJob(id: number): Observable<any> {
    const url = `${this.url}/${id}`;

    return this.http.delete(url);
  }

  applyForJob(job: Job): Observable<any> {
    const url = `${this.url}/${job.id}`;
    return this.http.put(url, job);
  }
}
