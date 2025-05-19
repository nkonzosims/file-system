import {Component, input} from '@angular/core';
import {DatePipe, SlicePipe} from '@angular/common';
import { File } from '../../services/file-system.service';

@Component({
  selector: 'app-file',
  standalone: true,
  imports: [DatePipe, SlicePipe],
  templateUrl: './file.component.html'
})
export class FileComponent {
  content = input.required<File>();

  getFileIcon(extension: string | null) {
    if (!extension) return '📄';

    const icons: Record<string, string> = {
      '.txt': '📝',
      '.pdf': '📕',
      '.jpg': '🖼️',
      '.png': '🖼️',
      '.mp3': '🎵',
      '.mp4': '🎬',
      '.zip': '🗜️',
    };

    return icons[extension.toLowerCase()] || '📄';
  }
}
