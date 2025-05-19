import {Component, input, output} from '@angular/core';
import {DatePipe, SlicePipe} from '@angular/common';
import {File} from '../../services/file-system.service';

@Component({
  selector: 'app-directory',
  standalone: true,
  imports: [
    DatePipe,
    SlicePipe
  ],
  templateUrl: './directory.component.html'
})
export class DirectoryComponent {

  openDir = output<File>();
  content = input.required<File>();

  open(event: Event) {
    event.stopPropagation()
    this.openDir.emit(this.content());
  }

}
