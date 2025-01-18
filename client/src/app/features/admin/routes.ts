import { Route } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminGuard } from '../../core/guards/admin.guard';
import { AddEditMemberComponent } from './add-edit-member/add-edit-member.component';

export const adminRoutes: Route[] = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AdminGuard],
    children: [
      { path: '', component: AdminComponent },
      // path for creating a new member
      { path: 'add-edit-member', component: AddEditMemberComponent },
      // path for editing an existing member
      { path: 'add-edit-member/:id', component: AddEditMemberComponent },
    ],
  },
];
