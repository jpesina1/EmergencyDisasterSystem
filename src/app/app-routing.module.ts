import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '',loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)},

  {path: 'terms',loadChildren: () => import('./terms/terms.module').then( m => m.TermsPageModule)},
  
  {path: 'policy',loadChildren: () => import('./policy/policy.module').then( m => m.PolicyPageModule)},
  
  {path: 'shelter-details',loadChildren: () => import('./pages/shelter-details/shelter-details.module').then( m => m.ShelterDetailsPageModule)},
  
  {path: 'shelter-details/:id',loadChildren: () => import('./pages/shelter-details/shelter-details.module').then( m => m.ShelterDetailsPageModule)},
  
  {path: 'supply-details',loadChildren: () => import('./supply-details/supply-details.module').then( m => m.SupplyDetailsPageModule)},

  {path: 'supply-details/:id',loadChildren: () => import('./supply-details/supply-details.module').then( m => m.SupplyDetailsPageModule)},
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}