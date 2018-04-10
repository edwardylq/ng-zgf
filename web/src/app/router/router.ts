import {RouterModule, Routes} from '@angular/router'

import {MyComponent} from '../components/my/my.component' 
import {ClassifyComponent} from '../components/classify/classify.component' 
import {HomeComponent} from '../components/home/home.component' 
import {BuycarComponent} from '../components/buycar/buycar.component' 


const routes: Routes = [
    {path:'',component:MyComponent},
    {path:'my',component:MyComponent},
    {path:'home',component:HomeComponent},
    {path:'buycar',component:BuycarComponent},
    {path:'classify',component:ClassifyComponent}
]

export const AppRouter = RouterModule.forRoot(
    routes,
    {enableTracing: false}
)