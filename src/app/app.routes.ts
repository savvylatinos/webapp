import {RouterModule,Routes} from '@angular/router';
import {
	TestappComponent,
	RegisterComponent,
	AccountComponent,
//	FruittopbarComponent,
	}from "./components/index.paginas";
	import { AuthGuard } from './guards/auth.guard';

const app_routes: Routes = [
	{path:'',component:TestappComponent},
	{path:'register',component:RegisterComponent},
	{path:'account',component:AccountComponent,canActivate:[AuthGuard]},
	{path:'**',pathMatch:'full',redirectTo:''}
	];
	export const app_routing = RouterModule.forRoot(app_routes);

