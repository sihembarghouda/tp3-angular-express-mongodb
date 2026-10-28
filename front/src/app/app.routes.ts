import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Appareils } from './pages/appareils/appareils';
import { AppareilDetail } from './pages/appareil-detail/appareil-detail';
import { Contact } from './pages/contact/contact';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: '', component: Home, title: 'Accueil' },
  { path: 'appareils', component: Appareils, title: 'Appareils' },
  {
    path: 'appareils/:id',
    component: AppareilDetail,
    title: 'Détail d’un appareil'
  },
  { path: 'contact', component: Contact, title: 'Contact' },
  { path: 'login', component: Login, title: 'Connexion' },
  { path: '**', redirectTo: '' }
];