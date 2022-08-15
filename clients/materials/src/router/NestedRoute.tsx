import { Route } from 'react-router-dom';

const NestedRoute = (route: any) => (
  <Route
    path={route.path}
    exact={route.exact}
    component={() => {
      if (route.routes) {
        return (
          <route.component>
            {route.routes.map((children: any, index: number) => (
              <NestedRoute {...children} key={index} />
            ))}
          </route.component>
        );
      }
      return <Route key={route.path} {...route} />;
    }}
  />
);

export default NestedRoute;
