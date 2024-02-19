import { UserService } from '@services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '@store/user/user.selector';
import { UserInfoType } from '@type/types';
import { GetInitialsPipe } from '@pipes/get-initials.pipe';
import { ButtonRippleDirective } from '@directives/button-ripple/button-ripple.directive';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [GetInitialsPipe, ButtonRippleDirective],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent implements OnInit {
  user = {} as Readonly<UserInfoType> ;
  display = false;
  constructor(private store: Store, private userService: UserService) {
    this.store.select(selectUser).subscribe((user) => {
      this.user = user;
    });
  }

  logOut() {
    this.userService.logOut();
    
  }

  ngOnInit(): void {
    console.log(this.user)
    }
    
}
