import {Message} from "./message";
import {Http, Headers} from "angular2/http";
import {Injectable} from "angular2/core";
import 'rxjs/Rx'
import {Observable} from "rxjs/Observable";

@Injectable()
export class MessageService{
    messages: Message[] = [];

    constructor(private _http: Http){}

    addMessage(message: Message){
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type' : 'application/json'});
        return this._http.post('/message', body, {headers: headers})
            .map(response => {
                const data = response.json().obj;
                let message = new Message(data.content, data._id, 'Dummy', null);
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
                    let message = new Message(data[i].content, data[i]._id, 'Dummy', null);
                    objs.push(message);
                };
                return objs;
            })
            .catch(error => Observable.throw(error.json()));
    }

editMessage(message: Message){
    this.messages[this.messages.indexOf(message)] = new Message('Edited', null, 'Dummy');
}

deleteMessage(message: Message){
    this.messages.splice(this.messages.indexOf(message),1);
}
}