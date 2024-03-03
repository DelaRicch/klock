import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '@store/user/user.selector';
import { UserInfoType } from '@type/types';
import { GetInitialsPipe } from '@pipes/get-initials.pipe';
import { ButtonRippleDirective } from '@directives/button-ripple/button-ripple.directive';
import { AvatarComponent } from '@components/shared/avatar/avatar.component';
import { ButtonComponent } from '@components/shared/button/button.component';

@Component({
  selector: 'klock-topbar',
  standalone: true,
  imports: [
    GetInitialsPipe,
    ButtonRippleDirective,
    AvatarComponent,
    ButtonComponent,
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent implements OnInit {
  user = {} as Readonly<UserInfoType>;
  display = false;
  constructor(private store: Store) {
    this.store.select(selectUser).subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    // console.log(this.user)
  }
}
