import React from 'react';
import Chat from './Chat';

const ChatList = (props) => {
    let datalist = props.datas.map((item) => {
        return (
            <Chat
                key={item.id}
                name={item.name}
                message={item.message}
                onDelete={() => props.deleteChat(item.id)}
                />
        )
    })

    return (
        <div class="card-body" id="card-body" >
            {datalist}
        </div>
    )
}

export default ChatList;
