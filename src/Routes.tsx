import React, { Fragment, lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./pages/HomePage";

type Routes = {
  exact?: boolean;
  path?: string | string[];
  guard?: any;
  layout?: any;
  component?: any;
  routes?: Routes;
}[];

export const renderRoutes = (routes: Routes = []) => (
  <Suspense fallback={<h2>Loading</h2>}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes)
                  ) : (
                    <Component {...props} />
                  )}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes: Routes = [
  {
    exact: true,
    path: "/",
    component: HomePage,
  },
  {
    exact: true,
    path: "/anti-heroes",
    component: lazy(() => import("./pages/AntiHeroesPage")),
  },
  {
    exact: true,
    path: "/villains",
    component: lazy(() => import("./pages/VillainsPage")),
  },
  {
    exact: true,
    path: "/heroes",
    component: lazy(() => import("./pages/HeroesPage")),
  },
];

export default routes;
