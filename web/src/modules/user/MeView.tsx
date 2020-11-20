import { gql } from 'apollo-boost';
import * as React from "react";
import { Query } from 'react-apollo';
import { RouteComponentProps } from "react-router-dom";
import { meQuery } from '../../schemaTypes'
import  meQuryVar  from '../../graphql/queries/me';

export class MeView extends React.PureComponent<RouteComponentProps<{}>> {
    render() {
        return (
            <div>Me View 
            {/* <Query>{()=>()}</Query> */}
            <Query<meQuery> query={meQuryVar}>
                {
                    ({ data, loading }) => {
                        if (loading) {
                            return null;
                        }

                        if (!data) {
                            return <div>Data is Undefined</div>
                        }

                        if (!data.me) {
                            return <div>Received No User</div>
                        }

                        return <div>{data.me.email}</div>
                    } //data
                }
            </Query>
            </div>
        )
    }
}