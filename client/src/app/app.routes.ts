import { Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { NotFoundComponent } from './shared/components/errors/not-found/not-found.component';
import { PlayComponent } from './features/play/play.component';
import { AuthorizationGuard } from './core/guards/authorization.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthorizationGuard],
    children: [{ path: 'play', component: PlayComponent }],
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./features/account/routes').then((r) => r.accountRoutes),
  },

  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];
