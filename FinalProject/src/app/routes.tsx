// Configuración de rutas — React Router Data Mode
import { createBrowserRouter } from 'react-router';
import { LandingScreen } from './screens/LandingScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { HomeScreen } from './screens/HomeScreen';
import { ExplorarScreen } from './screens/ExplorarScreen';
import { NegocioDetailScreen } from './screens/NegocioDetailScreen';
import { RegistrarNegocioScreen } from './screens/RegistrarNegocioScreen';
import { ModaCircularScreen } from './screens/ModaCircularScreen';
import { PerfilScreen } from './screens/PerfilScreen';
import { PorQueLocalScreen } from './screens/PorQueLocalScreen';
import { MiImpactoScreen } from './screens/MiImpactoScreen';
import { AdminScreen } from './screens/AdminScreen';

export const router = createBrowserRouter([
  { path: '/', Component: LandingScreen },
  { path: '/login', Component: LoginScreen },
  { path: '/register', Component: RegisterScreen },
  { path: '/home', Component: HomeScreen },
  { path: '/explorar', Component: ExplorarScreen },
  { path: '/negocio/:id', Component: NegocioDetailScreen },
  { path: '/registrar-negocio', Component: RegistrarNegocioScreen },
  { path: '/moda-circular', Component: ModaCircularScreen },
  { path: '/perfil', Component: PerfilScreen },
  { path: '/por-que-local', Component: PorQueLocalScreen },
  { path: '/mi-impacto', Component: MiImpactoScreen },
  { path: '/admin', Component: AdminScreen },
  { path: '*', Component: LandingScreen },
]);
