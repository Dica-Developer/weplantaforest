import { createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user.service';
import { switchMap } from 'rxjs/operators';
import { AppState } from './app.state';
import { Injectable } from '@angular/core';
import { TreeType } from './project.store';
import { addSuccessMessage } from './success-message.state';

export interface User {
  admin: boolean;
  articleManager: boolean;
  banned: boolean;
  enabled: boolean;
  regDate: number;
  id: number;
  mail: string;
  name: string;
}

export interface TreesForUser {
  userId: number;
  trees: Tree[];
}

export interface Tree {
  amount: number;
  id: number;
  treeType: TreeType;
}

export const loadUsers = createAction('[User] load all user');
export const loadUsersSuccess = createAction(
  '[User] load all user success',
  props<{ users: User[] }>(),
);

export const updateUserName = createAction(
  '[User] update userName',
  props<{ userId: number; userName: string }>(),
);
export const updateUserNameSuccess = createAction(
  '[User] update userName success',
  props<{ userId: number; userName: string }>(),
);

export const updateUserEmail = createAction(
  '[User] update mail',
  props<{ userId: number; mail: string }>(),
);
export const updateUserEmailSuccess = createAction(
  '[User] update mail success',
  props<{ userId: number; mail: string }>(),
);

export const updateUserActiveFlag = createAction(
  '[User] update active flag',
  props<{ userId: number; value: boolean }>(),
);

export const updateUserActiveFlagSuccess = createAction(
  '[User] update active flag success',
  props<{ userId: number; value: boolean }>(),
);

export const updateUserBannedFlag = createAction(
  '[User] update banned flag',
  props<{ userId: number; value: boolean }>(),
);

export const updateUserBannedFlagSuccess = createAction(
  '[User] update banned flag success',
  props<{ userId: number; value: boolean }>(),
);

export const updateUserAdminRole = createAction(
  '[User] update admin role',
  props<{ userId: number; value: boolean }>(),
);

export const updateUserAdminRoleSuccess = createAction(
  '[User] update admin role success',
  props<{ userId: number; value: boolean }>(),
);

export const updateUserArticleManagerRole = createAction(
  '[User] update article-manager role',
  props<{ userId: number; value: boolean }>(),
);

export const updateUserArticleManagerRoleSuccess = createAction(
  '[User] update article-manager role success',
  props<{ userId: number; value: boolean }>(),
);

export const loadTreesForUser = createAction(
  '[User] load trees for user',
  props<{ userId: number }>(),
);

export const loadTreesForUserSuccess = createAction(
  '[User] update article-manager role success',
  props<{ userId: number; trees: Tree[] }>(),
);

export const transferTrees = createAction(
  '[User] transfer trees',
  props<{ fromUserId: number; toUserId: number }>(),
);

export interface UserState {
  users: User[];
  usersLoading: boolean;
  treesForUser: TreesForUser;
}

export const initialState: UserState = {
  users: [],
  usersLoading: false,
  treesForUser: null,
};

const userReducer = createReducer(
  initialState,
  on(loadUsers, (state) => ({ ...state, usersLoading: true })),
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    usersLoading: false,
  })),
  on(updateUserNameSuccess, (state, { userId, userName }) => ({
    ...state,
    users: state.users
      .map((user) => ({ ...user }))
      .map((user) => {
        if (user.id == userId) {
          return {
            ...user,
            name: userName,
          };
        } else {
          return user;
        }
      }),
  })),
  on(updateUserEmailSuccess, (state, { userId, mail }) => ({
    ...state,
    users: state.users
      .map((user) => ({ ...user }))
      .map((user) => {
        if (user.id == userId) {
          return {
            ...user,
            mail,
          };
        } else {
          return user;
        }
      }),
  })),
  on(updateUserBannedFlagSuccess, (state, { userId, value }) => ({
    ...state,
    users: state.users
      .map((user) => ({ ...user }))
      .map((user) => {
        if (user.id == userId) {
          return {
            ...user,
            banned: value,
          };
        } else {
          return user;
        }
      }),
  })),
  on(updateUserActiveFlagSuccess, (state, { userId, value }) => ({
    ...state,
    users: state.users
      .map((user) => ({ ...user }))
      .map((user) => {
        if (user.id == userId) {
          return {
            ...user,
            enabled: value,
          };
        } else {
          return user;
        }
      }),
  })),
  on(updateUserAdminRoleSuccess, (state, { userId, value }) => ({
    ...state,
    users: state.users
      .map((user) => ({ ...user }))
      .map((user) => {
        if (user.id == userId) {
          return {
            ...user,
            admin: value,
          };
        } else {
          return user;
        }
      }),
  })),
  on(updateUserArticleManagerRoleSuccess, (state, { userId, value }) => ({
    ...state,
    users: state.users
      .map((user) => ({ ...user }))
      .map((user) => {
        if (user.id == userId) {
          return {
            ...user,
            articleManager: value,
          };
        } else {
          return user;
        }
      }),
  })),
  on(loadTreesForUser, (state, { userId }) => ({
    ...state,
    treesForUser: null,
  })),
  on(loadTreesForUserSuccess, (state, { userId, trees }) => ({
    ...state,
    treesForUser: { userId, trees },
  })),
);

export function userReducerFn(state, action) {
  return userReducer(state, action);
}

export const usersFeature = (state: AppState) => state.userState;

export const selectUsers = createSelector(usersFeature, (state: UserState) => state.users);

export const selectUsersLoadingProgress = createSelector(
  usersFeature,
  (state: UserState) => state.usersLoading,
);

export const selectTreesForUser = createSelector(
  usersFeature,
  (state: UserState) => state.treesForUser,
);

export const selectAmountTreesForUser = createSelector(usersFeature, (state: UserState) =>
  calcAmountOfTrees(state),
);

export function calcAmountOfTrees(state: UserState) {
  if (state && state.treesForUser) {
    let cnt = 0;
    for (const tree of state.treesForUser.trees) {
      cnt += tree.amount;
    }
    return cnt;
  } else {
    return 0;
  }
}

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  LoadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        this.userService
          .loadAllUser()
          .pipe(switchMap((users: User[]) => {
          return [loadUsersSuccess({ users })]
        }
        )),
      ),
    ),
  );

  UpdateUserName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserName),
      switchMap((action) =>
        this.userService.updateUsername(action.userId, action.userName).pipe(
          switchMap(() => [
            updateUserNameSuccess(action),
            addSuccessMessage({
              message: { key: 'USERNAME_UPDATED', message: 'Username wurde geupdated' },
            }),
          ]),
        ),
      ),
    ),
  );

  UpdateUserMail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserEmail),
      switchMap((action) =>
        this.userService.updateMail(action.userId, action.mail).pipe(
          switchMap(() => [
            updateUserEmailSuccess(action),
            addSuccessMessage({
              message: { key: 'USERMAIL_UPDATED', message: 'Usermail wurde geupdated' },
            }),
          ]),
        ),
      ),
    ),
  );

  UpdateUserBannedFlag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserBannedFlag),
      switchMap((action) =>
        this.userService.updateBannedFlag(action.userId, action.value).pipe(
          switchMap(() => [
            updateUserBannedFlagSuccess(action),
            addSuccessMessage({
              message: {
                key: 'UPDATE_BANNED_FLAG',
                message: action.value ? 'User wurde gebannt' : 'User wurde entbannt',
              },
            }),
          ]),
        ),
      ),
    ),
  );

  UpdateUserActiveFlag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserActiveFlag),
      switchMap((action) =>
        this.userService.updateActiveFlag(action.userId, action.value).pipe(
          switchMap(() => [
            updateUserActiveFlagSuccess(action),
            addSuccessMessage({
              message: {
                key: 'UPDATE_ACTIVE_FLAG',
                message: action.value
                  ? 'User wurde aktiviert'
                  : 'User wurde auf nicht aktiv gesetzt',
              },
            }),
          ]),
        ),
      ),
    ),
  );

  UpdateUserAdminRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserAdminRole),
      switchMap((action) =>
        this.userService.updateAdminRole(action.userId, action.value).pipe(
          switchMap(() => [
            updateUserAdminRoleSuccess(action),
            addSuccessMessage({
              message: {
                key: 'UPDATE_ADMIN_ROLE',
                message: action.value
                  ? 'User wurden Adminrechte vergeben'
                  : 'User wurden Adminrechte entzogen',
              },
            }),
          ]),
        ),
      ),
    ),
  );

  UpdateUserArticleManagerRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserArticleManagerRole),
      switchMap((action) =>
        this.userService
          .updateArticleManagerRole(action.userId, action.value)
          .pipe(switchMap(() => [updateUserArticleManagerRoleSuccess(action),
            addSuccessMessage({
              message: {
                key: 'UPDATE_ARTICLE_MANAGER_ROLE',
                message: action.value
                  ? 'User wurden Article-Manager vergeben'
                  : 'User wurden Article-Manager entzogen',
              },
            }),

          ])),
      ),
    ),
  );

  LoadTreesForUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTreesForUser),
      switchMap((action) =>
        this.userService
          .getTreesForUser(action.userId)
          .pipe(
            switchMap((trees: Tree[]) => [
              loadTreesForUserSuccess({ userId: action.userId, trees }),
            ]),
          ),
      ),
    ),
  );

  TranferTrees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(transferTrees),
      switchMap((action) =>
        this.userService.transferTrees(action.fromUserId, action.toUserId).pipe(
          switchMap(() => [
            addSuccessMessage({
              message: {
                key: 'TRANSFER_TREES_SUCCESS',
                message: 'Bäume wurden transferiert!',
              },
            }),
          ]),
        ),
      ),
    ),
  );
}
