import { Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { NotFoundComponent } from './shared/components/errors/not-found/not-found.component';
import { PlayComponent } from './features/play/play.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'play', component: PlayComponent },
  { path: 'not-found', component: NotFoundComponent },
  {
    path: 'account',
    loadChildren: () =>
      import('./features/account/routes').then((r) => r.accountRoutes),
  },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];
