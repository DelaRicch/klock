import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '@store/user/user.selector';
import { User, UserInfoType } from '@type/types';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { GetInitialsPipe } from '@pipes/get-initials.pipe';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [ButtonModule, AvatarModule, GetInitialsPipe],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent implements OnInit {
  user = {} as Readonly<UserInfoType> ;
  display = false;
  constructor(private store: Store) {
    this.store.select(selectUser).subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    console.log(this.user)
    }
    
}
