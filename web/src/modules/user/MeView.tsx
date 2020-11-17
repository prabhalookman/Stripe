import { gql } from 'apollo-boost';
import * as React from "react";
import { Query } from 'react-apollo';
import { RouteComponentProps } from "react-router-dom";
import { meQuery } from '../../schemaTypes'

// const meQueryDef = gql`
// query meQuery{
//     me{
//         id
//         email
//     }
// }`

export class MeView extends React.PureComponent<RouteComponentProps<{}>> {
    render() {
        return (
            <div>Hi</div>
            //  <Query>{()=>()}</Query>
            // <Query<meQuery> query={meQueryDef}>
            //     {
            //         ({ data, loading }) => {
            //             if (loading) {
            //                 return null;
            //             }

            //             if (!data) {
            //                 return <div>data is undefined</div>
            //             }

            //             if (!data.me) {
            //                 return <div>received no user</div>
            //             }

            //             return <div>{data.me.email}</div>
            //         } //data
            //     }
            // </Query>
        )
    }
}