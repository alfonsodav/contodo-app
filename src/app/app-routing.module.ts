import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 /*  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  }, */
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'publicity',
    loadChildren: () => import('./pages/publicity/publicity.module').then( m => m.PublicityPageModule)
  },
  {
    path: 'wellcome',
    loadChildren: () => import('./pages/wellcome/wellcome.module').then( m => m.WellcomePageModule)
  },
  {
    path: 'awards',
    loadChildren: () => import('./pages/awards/awards.module').then( m => m.AwardsPageModule)
  },
  {
    path: 'my-awards',
    loadChildren: () => import('./pages/my-awards/my-awards.module').then( m => m.MyAwardsPageModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./pages/news/news.module').then( m => m.NewsPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'games',
    loadChildren: () => import('./pages/games/games.module').then( m => m.GamesPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
