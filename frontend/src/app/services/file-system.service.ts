import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl;


  getDirectories(path = '') {
    const params: { path?: string } = {};
    if (path) params.path = path;
    return this.httpClient.get<DirectoryRes>(`${this.baseUrl}/directory`, { params });
  }
}

export interface DirectoryRes {
  path: string;
  contents: File[]
}

export interface File {
  name: string;
  fullPath: string;
  isDirectory: boolean;
  size: number;
  extension: string;
  type: string;
  createdAt: string | Date;
  permissions: {
    readable: boolean;
    writable: boolean;
    executable: boolean;
  }
}
