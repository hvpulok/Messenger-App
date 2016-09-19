import {Message} from "./message";
import {Http, Headers} from "angular2/http";
import {Injectable, EventEmitter} from "angular2/core";
import 'rxjs/Rx'
import {Observable} from "rxjs/Observable";

@Injectable()
export class MessageService{
    messages: Message[] = [];
    messageIsEdit = new EventEmitter<Message>();

    constructor(private _http: Http){}

    addMessage(message: Message){
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type' : 'application/json'});
        var token = localStorage.getItem('token');
        if(token)
            token = '?token=' + localStorage.getItem('token');
        else
            token = "";

        return this._http.post('/message' + token, body, {headers: headers})
            .map(response => {
                const data = response.json().obj;
                let message = new Message(data.content, data._id, data.user.firstName, data.user._id);
                return message;
            })
            .catch(error => Observable.throw(error.json()));
    }

    getMessages(){
        return this._http.get('/message')
            .map(res => {
                const data = res.json().obj;
                let objs: any[] = [];
                for(let i=0; i< data.length; i++){
                    let message = new Message(data[i].content, data[i]._id, data[i].user.firstName, data[i].user._id);
                    objs.push(message);
                };
                return objs;
            })
            .catch(error => Observable.throw(error.json()));
    }

editMessage(message: Message){
    this.messageIsEdit.emit(message);
}

updateMessage(message: Message){
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type' : 'application/json'});
    return this._http.patch('/message/' + message.messageId, body, {headers : headers})
        .map(response => response.json())
        .catch(error => Observable.throw(error.json()));
}

deleteMessage(message: Message){
    this.messages.splice(this.messages.indexOf(message),1);
    return this._http.delete('/message/' + message.messageId)
        .map(response => response.json())
        .catch(error => Observable.throw(error.json()));
    }
}