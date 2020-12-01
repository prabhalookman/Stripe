import React, { PureComponent } from 'react'

export default class CreateCustomer extends PureComponent {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log("Create Customer Form Data : ", data)

        // fetch('/api/form-submit-url', {
        //   method: 'POST',
        //   body: data,
        // });
    }

    render() {
        return (
            <div>
                <h2>Create Customer </h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group"></div>
                    <label htmlFor="username">Enter username</label>
                    <input id="username" name="username" type="text" className="form-control" />

                    <div className="form-group">
                        <label htmlFor="email">Enter your email</label>
                        <input id="email" name="email" type="email" className="form-control" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Enter your address</label>
                        <input id="birthdate" name="address" type="text" className="form-control" />
                    </div>

                    <button className="btn btn-danger">Send data!</button>
                </form>
            </div>
        )
    }
}
