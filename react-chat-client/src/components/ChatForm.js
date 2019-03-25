import React, { Component } from 'react';

class ChatForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name : "",
            message : ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleMessageChange = this.handleMessageChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
    }

    handleNameChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleMessageChange(e) {
        this.setState({
            message: e.target.value
        })
    }

    handleSubmit(e) {
        if (this.state.name && this.state.message ) {
            const item = {
                id : Date.now(),
                name : this.state.name,
                message : this.state.message
            }
            this.props.postChat(item)

            this.setState({ name: "", message: ""})
            e.preventDefault();
        }
    }


    render() {
        return (
            <div class="card-body">
                <form onSubmit={this.handleSubmit}>
                    <div class="form-group">
                        <input class="form-control" placeholder="Name" onChange={this.handleNameChange} value={this.state.name}/>
                    </div>
                    <div class="form-group">
                        <textarea class="form-control" id="exampleInputEmail1" placeholder="Write your chat here!" onChange={this.handleMessageChange} value={this.state.message}></textarea>
                    </div>
                    <button type="submit" class="btn btn-success"><i class="fa fa-send"></i> POST</button>
                </form>
            </div>
        )
    }
}

export default ChatForm;
