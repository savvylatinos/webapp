import {RouterModule,Routes} from '@angular/router';
import {
	TestappComponent,
	RegisterComponent,
	LoginComponent,
	AccountComponent,
	SLlcComponent,
	SCorpComponent,
	SItinComponent,
	SEinComponent,
	SArComponent,
	STaxComponent,
	SDunsComponent,
	SFdaComponent,



//	FruittopbarComponent,
	}from "./components/index.paginas";
	import { AuthGuard } from './guards/auth.guard';

const app_routes: Routes = [
	{path:'',component:TestappComponent},
	{path:'register',component:RegisterComponent},
	{path:'login',component:LoginComponent},
	{path:'llc',component:SLlcComponent},
	{path:'corp',component:SCorpComponent},
	{path:'itin',component:SItinComponent},
	{path:'ein',component:SEinComponent},
	{path:'ar',component:SArComponent},
	{path:'tax',component:STaxComponent},
	{path:'duns',component:SDunsComponent},
	{path:'fda',component:SFdaComponent},
	{path:'account',component:AccountComponent,canActivate:[AuthGuard]},
	{path:'**',pathMatch:'full',redirectTo:''}
	];
	export const app_routing = RouterModule.forRoot(app_routes);

