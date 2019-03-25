import React, { Component } from 'react';
import socket from 'socket.io-client';
import ChatList from './ChatList';
import ChatForm from './ChatForm';


class ChatBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data : [],
            isLoading : true
        }
        this.postChat = this.postChat.bind(this);
        this.deleteChat = this.deleteChat.bind(this);
        this.socket = socket('http://localhost:3001')
    }

    componentDidMount() {
        this.socket.emit('initial_data')
        this.socket.on('message', data => {
            this.setState({data, isLoading :false})
        });
    }

    postChat(item) {
        this.setState(state => ({
            data:[...state.data, item]
        }))
        this.socket.emit('postAdd', item)
    }

    deleteChat(id) {
        this.setState((state) => ({
            data: state.data.filter((item) => item.id !== id )

        }))
        this.socket.emit('deleteData', id)
    }

    render() {
        const {isLoading} = this.state

        if (isLoading) {
            return <h1>Loding...</h1>
        }

        return (
            <div class="container">
                <div class="card">
                    <div class="card-header">
                        <h3><b>REACT CHATS</b></h3>
                    </div>
                    <ChatList datas={this.state.data} deleteChat={this.deleteChat} />
                    <ChatForm postChat={this.postChat}/>
                </div>
            </div>
        );
    }
}

export default ChatBox;
