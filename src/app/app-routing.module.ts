import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { GuideComponent } from './guide/guide.component';
// import {InteriordesignComponent} from './interiordesign/interiordesign.component';
import { ArchitectureComponent } from './architecture/architecture.component';
import { InteriordesignComponent } from './interiordesign/interiordesign.component';
import { RepairComponent } from './repair/repair.component';
import { PlumbingComponent } from './plumbing/plumbing.component';
import { MaterialsComponent } from './materials/materials.component';
import { ContractorsComponent } from './contractors/contractors.component';
import { ListingComponent } from './listing/listing.component';
import { DisplayComponent } from './display/display.component';
import { BookslotComponent } from './bookslot/bookslot.component';
import { PaymentComponent } from './payment/payment.component';
import { ThankyouComponent } from './thankyou/thankyou.component';

import { from } from 'rxjs';


const routes: Routes = [
  {path: 'Repair', component: RepairComponent},
  {path: 'Bookslot', component: BookslotComponent},
  {path: 'listing', component: ListingComponent},
  {path: 'display', component: DisplayComponent},
  {path: 'Plumbing', component: PlumbingComponent},
  {path: 'Contractors', component: ContractorsComponent},
  {path: 'Materials', component: MaterialsComponent},
  {path: 'Interior', component: InteriordesignComponent},
  {path: 'Payment', component: PaymentComponent},
  {path: 'thankyou', component: ThankyouComponent},
  {path: 'Architecture', component: ArchitectureComponent},
  {path: 'guide', component: GuideComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'footer', component: FooterComponent},
  {path: '', component: ContentComponent, pathMatch: 'full'},
  {path: '**', component: HeaderComponent}, // Wildcard route for a 404 page
  // { path: '',   redirectTo: '/first-component', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
