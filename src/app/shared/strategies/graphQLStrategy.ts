import { HttpClient } from '@angular/common/http';
import {
  NbAuthStrategy,
  NbPasswordAuthStrategyOptions,
  NbAuthStrategyClass,
  NbAuthResult
} from '@nebular/auth';

import { Apollo } from 'apollo-angular';
import { catchError, map, Observable } from 'rxjs';
import { LOG_IN_MUTATION } from 'src/utils/gqlMutations';

// TODO: finish strategy

export class GraphqlAuthStrategy extends NbAuthStrategy {
  protected defaultOptions: NbPasswordAuthStrategyOptions =
    passwordStrategyOptions;

  static setup(
    options: NbPasswordAuthStrategyOptions
  ): [NbAuthStrategyClass, NbPasswordAuthStrategyOptions] {
    return [GraphqlAuthStrategy, options];
  }

  constructor(private apollo: Apollo, protected http: HttpClient) {
    super();
  }

  authenticate(data?: any): Observable<NbAuthResult> {
    const module = 'login';
    const requireValidToken = this.getOption(`${module}.requireValidToken`);
    return this.apollo
      .mutate({
        mutation: LOG_IN_MUTATION,
        variables: data
      })
      .pipe(
        map((res) => {
          console.log(res);
          // const response = { data: { ...res.data.signin } };
          // return new NbAuthResult(
          //   true,
          //   response,
          //   this.getOption(`${module}.redirect.success`),
          //   [],
          //   this.getOption('messages.getter')(module, res, this.options),
          //   this.createToken(
          //     this.getOption('token.getter')(module, response, this.options),
          //     requireValidToken
          //   )
          // );
        }),
        catchError((res) => this.handleResponseError(res, module))
      );
  }
}
