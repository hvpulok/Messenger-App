import {Component, OnInit} from "angular2/core";
import {Message} from "./message";
import {MessageService} from "./message.service";

@Component({
    selector: "my-message-input",
    directives:[],
    providers: [],
    template:`
            <section class="col-md-8 col-md-offset-2">
                <form (ngSubmit)="onSubmit(f.value)" #f = "ngForm">
                    <div class="form-group">
                        <label for="content">Content</label>
                        <input type="text" 
                            class="form-control" 
                            id="content"
                            ngControl="content"
                            [ngModel] = "message?.content"
                            >
                    </div>
                    <button type="submit" 
                        class="btn btn-primary"
                        >
                        {{ !message ? 'Send Message' : 'Save Message'}}
                    </button>
                    <button type="button" class="btn btn-danger"
                        *ngIf="message" (click)="onCancel()"
                    >Cancel</button>
                </form>
            </section>               
        
        `
})


export class MessageInputComponent implements OnInit{
    constructor(private _messageService: MessageService){}

    message:Message = null;

    ngOnInit(){
        this._messageService.messageIsEdit.subscribe(
            editMessage => {
                this.message = editMessage;
            }

        );
    }

    onSubmit(form: any){
        if(this.message){
            //edit message case
            this.message.content = form.content;
            this._messageService.updateMessage(this.message)
                .subscribe(
                    data => console.log(data),
                    error => console.error(error)
                );
            this.message = null;

        } else{
            //save message case
            const message: Message = new Message(form.content, null, 'Dummy',null);
            this._messageService.addMessage(message)
                .subscribe(
                    data =>{
                        console.log(data);
                        this._messageService.messages.push(data);
                    },
                    error => console.error(error)
                );
        }
    }

    onCancel(){
        this.message = null;
    }
}