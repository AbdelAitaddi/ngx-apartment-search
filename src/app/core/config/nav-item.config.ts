import { App_Route } from './app-route.config';
import { NavItem } from '../models';
import { Icons } from './icons.config';

export const nav_List: NavItem[] = [
  {
    route: App_Route.apartment_List,
    name: 'i18n.core.pageName.menuApartment.label',
    icon: Icons.realEstate,
    hint: 'i18n.core.pageName.menuApartment.hint',
  },
  {
    route: App_Route.favourites,
    name: 'i18n.core.pageName.menuMyFavourites.label',
    icon: Icons.volunteerActivism,
    hint: 'i18n.core.pageName.menuMyFavourites.hint',
  },
  {
    route: App_Route.about,
    name: 'i18n.core.pageName.menuAbout.label',
    icon: Icons.info,
    hint: 'i18n.core.pageName.menuAbout.hint',
  },
];
