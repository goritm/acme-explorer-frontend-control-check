import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, ApolloLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

const uri = 'https://api-gateway-bujosa.cloud.okteto.net/graphql';

export function createApollo(httpLink: HttpLink) {
  const basic = setContext(() => ({
    headers: {
      Accept: 'charset=utf-8'
    }
  }));

  const auth = setContext(() => {
    const token = localStorage.getItem('token');

    return token === null
      ? {}
      : {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
  });

  return {
    cache: new InMemoryCache(),
    link: ApolloLink.from([basic, auth, httpLink.create({ uri })])
  };
}

@NgModule({
  exports: [HttpClientModule, ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule {}
