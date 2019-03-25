import React from 'react';

const Chat = (props) => {
    return(
        <div>
            <button className="btn btn-light pull-right" type="button" id="pull-right" onClick={props.onDelete}>Delete</button>
            <h5>Name : <b>{props.name}</b></h5>
            <p> - {props.message}</p>
            <hr />
        </div>
    )
}

export default Chat;
