import {Component, inject, OnInit} from '@angular/core';
import {UserInfoType} from '@type/auth.types';
import {GetInitialsPipe} from '@pipes/get-initials.pipe';
import {AvatarComponent} from '@components/shared/avatar/avatar.component';
import {ButtonComponent} from '@components/shared/button/button.component';
import {AuthService} from "@services/auth/auth.service";

@Component({
  selector: 'klock-topbar',
  standalone: true,
  imports: [
    GetInitialsPipe,
    AvatarComponent,
    ButtonComponent,
  ],
  template: `
    <header
      class="bg-[#F9FAFB] h-[83px] w-full flex items-center justify-end gap-4 pr-6 md:px-[45px]"
    >

      <button class="border-2 border-blue-600 rounded-md" (click)="logOut()">Logout</button>

      <klock-button [isIcon]="true">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_23044_5766)">
            <path
              d="M13.9987 7.66732C13.9987 8.91993 13.6273 10.1444 12.9313 11.1859C12.2354 12.2274 11.2463 13.0392 10.089 13.5186C8.93176 13.9979 7.65834 14.1233 6.42979 13.879C5.20125 13.6346 4.07276 13.0314 3.18702 12.1457C2.30129 11.2599 1.6981 10.1314 1.45373 8.90289C1.20935 7.67434 1.33478 6.40092 1.81413 5.24366C2.29349 4.08639 3.10524 3.09726 4.14676 2.40134C5.18827 1.70543 6.41275 1.33398 7.66537 1.33398C9.34507 1.33398 10.956 2.00124 12.1437 3.18897C13.3314 4.37671 13.9987 5.98761 13.9987 7.66732V7.66732Z"
              stroke="#292D32"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.6654 14.6673L13.332 13.334"
              stroke="#292D32"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_23044_5766">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </klock-button>
      <klock-button [isIcon]="true" >
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.3399 14.7092L18.3399 13.0492C18.1299 12.6792 17.9399 11.9792 17.9399 11.5692V9.03924C17.9399 6.68924 16.5599 4.65924 14.5699 3.70924C14.0499 2.78924 13.0899 2.21924 11.9899 2.21924C10.8999 2.21924 9.91994 2.80924 9.39994 3.73924C7.44994 4.70924 6.09994 6.71924 6.09994 9.03924V11.5692C6.09994 11.9792 5.90994 12.6792 5.69994 13.0392L4.68994 14.7092C4.28994 15.3792 4.19994 16.1192 4.44994 16.7992C4.68994 17.4692 5.25994 17.9892 5.99994 18.2392C7.93994 18.8992 9.97994 19.2192 12.0199 19.2192C14.0599 19.2192 16.0999 18.8992 18.0399 18.2492C18.7399 18.0192 19.2799 17.4892 19.5399 16.7992C19.7999 16.1092 19.7299 15.3492 19.3399 14.7092Z"
            fill="#292D32"
          />
          <path
            d="M14.8297 20.2292C14.4097 21.3892 13.2997 22.2192 11.9997 22.2192C11.2097 22.2192 10.4297 21.8992 9.87969 21.3292C9.55969 21.0292 9.31969 20.6292 9.17969 20.2192C9.30969 20.2392 9.43969 20.2492 9.57969 20.2692C9.80969 20.2992 10.0497 20.3292 10.2897 20.3492C10.8597 20.3992 11.4397 20.4292 12.0197 20.4292C12.5897 20.4292 13.1597 20.3992 13.7197 20.3492C13.9297 20.3292 14.1397 20.3192 14.3397 20.2892C14.4997 20.2692 14.6597 20.2492 14.8297 20.2292Z"
            fill="#292D32"
          />
        </svg>
      </klock-button>

      <klock-avatar />
    </header>
  `,
})
export class TopbarComponent implements OnInit {
  authService = inject(AuthService);

  user = {} as Readonly<UserInfoType>;
  display = false;

  ngOnInit(): void {
    // console.log(this.user)
  }

  logOut() {
this.authService.logout();
  }
}
