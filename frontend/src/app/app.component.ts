import {Component, inject, OnInit} from '@angular/core';
import {DirectoryRes, FileSystemService} from './services/file-system.service';
import {AsyncPipe, DatePipe, NgForOf, NgIf} from '@angular/common';
import {catchError, finalize, Observable, of} from 'rxjs';
import {DirectoryComponent} from './components/directory/directory.component';
import {FileComponent} from './components/file/file.component';
import {File} from './services/file-system.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, NgForOf, NgIf, DirectoryComponent, FileComponent, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  fileSystemService = inject(FileSystemService);
  public content$: Observable<DirectoryRes> | undefined;
  currentPath = '';
  pathHistory: string[] = [];
  loading = false;
  errorMessage = '';

  ngOnInit() {
    this.loadDirectory();
  }

  loadDirectory(path = '') {
    this.loading = true;
    this.errorMessage = '';
    this.currentPath = path;
    this.content$ = this.fileSystemService.getDirectories(path)
      .pipe(
        catchError((error) => {
          this.errorMessage = error.message || 'Failed to load directory content. Please try again';
          return of({ path: this.currentPath, contents: []})
        }),
        finalize(() => {
          this.loading = false;
        })
      );
    this.loading = false;
  }

  handleDirectoryOpen(file: File) {
    if (file.isDirectory) {
      this.pathHistory.push(this.currentPath)
      this.loadDirectory(file.fullPath)
    }
  }

  navigateUp() {
    if (this.pathHistory.length > 0) {
      const parentPath = this.pathHistory.pop();
      this.loadDirectory(parentPath);
    } else if (this.currentPath) {
      const parts = this.currentPath.split('/');
      parts.pop();
      this.loadDirectory(parts.join('/'));
    }
  }

  navigateHome() {
    this.loadDirectory();
  }
}
