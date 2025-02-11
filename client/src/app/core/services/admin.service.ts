import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MemberView } from '../../shared/models/admin/memberView';
import { MemberAddEdit } from '../../shared/models/admin/memberAddEdit';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getMembers() {
    return this.http.get<MemberView[]>(
      `${environment.apiUrl}admin/get-members`
    );
  }

  getMember(id: string) {
    return this.http.get<MemberAddEdit>(
      `${environment.apiUrl}admin/get-member/${id}`
    );
  }

  getApplicationRoles() {
    return this.http.get<string[]>(
      `${environment.apiUrl}admin/get-application-roles`
    );
  }

  addEditMember(model: MemberAddEdit) {
    return this.http.post(`${environment.apiUrl}admin/add-edit-member`, model);
  }

  lockMember(id: string) {
    return this.http.put(`${environment.apiUrl}admin/lock-member/${id}`, {});
  }

  unlockMember(id: string) {
    return this.http.put(`${environment.apiUrl}admin/unlock-member/${id}`, {});
  }

  deleteMember(id: string) {
    return this.http.delete(
      `${environment.apiUrl}admin/delete-member/${id}`,
      {}
    );
  }
}
