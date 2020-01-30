import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService, NbMenuService, NbMenuBag } from '@nebular/theme';
import { AuthService } from 'src/app/service/auth.service';
import { filter, map } from 'rxjs/operators';
import { Globals } from 'src/app/service/globals.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  userMenuTag = 'user-menu-tag';

  userMenuItems: NbMenuItem[] = [
    {
      title: 'Se déconnecter',
      link: '/login',
      icon: 'log-out-outline',
    }];

  userRole = '';

  menuSidebarItems: NbMenuItem[] = [
    {
      title: 'Projets',
      link: '/app/project/list',
      icon: 'layout-outline',
      home: true
    }
  ];

  menuSidebarTag = 'menu-sidebar';

  isMenuSidebarFixed = false;

  isSmallLayout = false;

  currentUser: any;

  constructor(
    private nbSidebarService: NbSidebarService,
    private authService: AuthService,
    private globals: Globals,
    private nbMenuService: NbMenuService,
    private router: Router
  ) {

  }


  ngOnInit() {
    console.log('This is what globals has : ', this.globals.role);
    this.currentUser = this.authService.getCurrentUserFromLocalStorage();
    switch (this.currentUser.userType) {
      case 'admin': this.userRole = 'Admin'; break;
    }

    this.nbMenuService.onItemClick().pipe(
      filter((value: NbMenuBag) => value.tag === this.userMenuTag),
      map((value: NbMenuBag) => value.item.link)
    ).subscribe(
      (link) => {
        if (link === '/login') {
          this.authService.signOut();
          this.router.navigate(['/login']);
        }
      }
    );

  }

  toggleMenuSidebar() {
    this.nbSidebarService.toggle(!this.isSmallLayout, this.menuSidebarTag);
    return false;
  }

}
