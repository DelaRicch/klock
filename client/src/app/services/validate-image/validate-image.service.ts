import { inject, Injectable } from '@angular/core';
import { AlertService } from '@services/alert/alert.service';
import { AlertProps } from '@type/types';

@Injectable({
  providedIn: 'root',
})
export class ValidateImageService {
  alertService = inject(AlertService);

  validateSelectedImage(file: File): Promise<File> {
    return new Promise((resolve, reject) => {
      const allowedTypes: string[] = [
        'image/svg+xml',
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/gif',
      ];

      if (!allowedTypes.includes(file.type)) {
        const error: AlertProps = {
          status: 'error',
          message: 'Invalid file type or extension: ' + file.name,
          title: 'Error',
          id: Date.now(),
        };
        reject(error);
        return;
      }

      if (file.size > 4 * 1024 * 1024) {
        const error: AlertProps = {
          status: 'error',
          message: 'Image size should be less than 4MB',
          title: 'Error',
          id: Date.now(),
        };
        reject(error);
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();

        img.onload = () => {
          const dimensions = {
            width: img.width,
            height: img.height,
          };

          if (dimensions.width > 5000 || dimensions.height > 4450) {
            const error: AlertProps = {
              status: 'error',
              message: 'Image dimensions should be 5000 x 4450px or less',
              title: 'Error',
              id: Date.now(),
            };
            reject(error);
          } else {
            resolve(file);
          }
        };

        if (typeof e.target?.result === 'string') {
          img.src = e.target?.result;
        }
      };

      reader.readAsDataURL(file);
    });
  }
}
