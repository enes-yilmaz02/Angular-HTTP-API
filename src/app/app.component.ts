
import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './interface/user';

import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users!:User[];
  title = 'Example';
  private user: any = {
    'id': 5,
    'name': 'Enes yilmaz',
    'username': 'Enes',
    'email': 'Enes1234@april.biz',
    'address': {
      'street': 'Kulas Light',
      'suite': 'Apt. 556',
      'city': 'Gwenborough',
      'zipcode': '92998-3874',

    }

  }
  fileStatus = {
    status: '',
    percentage: 0
  };

  constructor(private userservice: UserService) {

  }
  ngOnInit(): void {
    this.onGetUsers();
    //this.onDeleteUser();
    //this.onPatchUser();
    this.onGetUser();
    //this.onCreateUser();
    //this.onUpdateUser();
    //this.onTextFile();
  }
  //kullanıcıları görüntülenmesi için istek atıp gelmesini bekleyen fonksiyon
  onGetUsers(): void {
    this.userservice.getUsers().subscribe(
      (response) =>{ console.log(response);
      this.users=response;
      },
      (error) => console.log(error),
      () => console.log('done getting users')
    );

  }
//kullanıcıyı görüntülenmesi için istek atıp gelmesini bekleyen fonksiyon
  onGetUser(): void {
    this.userservice.getUser().subscribe(
      (response) => console.log(response),
      (error) => console.log(error),
      () => console.log('done getting user')
    );

  }
//kullanıcı oluşturmay yarayan fonksiyonu çağırıp uygulayan fonksiyon 
  onCreateUser(): void {
    this.userservice.createUser(this.user).subscribe(
      (response) => console.log(response),
      (error) => console.log(error),
      () => console.log(' createing user')
    );

  }
//kullanıcı güncellemeye yarayan fonksiyonu çağırıp uygulayan fonksiyon 
  onUpdateUser(): void {
    this.userservice.updateUser(this.user).subscribe(
      (response) => console.log(response),
      (error) => console.log(error),
      () => console.log(' updateed user')
    );

  }


  onPatchUser(): void {
    this.userservice.patchUser(this.user).subscribe(
      (response) => console.log(response),
      (error) => console.log(error),
      () => console.log(' patched user')
    );

  }
//kullanıcı silmeye yarayan fonksiyonu çağırığ silen fonksiyon
  onDeleteUser(): void {
    this.userservice.deleteUser(11).subscribe(
      (response) => console.log('Response from delete:', response),
      (error) => console.log(error),
      () => console.log(' deleteed user')
    );
    }
    //textin çağırıldığı fonksiyon
    onTextFile(): void {
      this.userservice.getTextFile().subscribe(
        (response) => console.log('Response from get text file:', response),
        (error) => console.log(error),
        () => console.log(' get file text ')
      );
      }
//dosyaların yüklendiği fonksiyon
  onUploadFile(files:File[]): void {

    console.log(files);
    const formdata = new FormData();
    for (const file of files)
    {
      formdata.append('files', file, file.name)
    }
    
    this.userservice.uploadFiles(formdata).subscribe(
      (event) =>
       {

        switch (event.type)
         {

          case HttpEventType.DownloadProgress || HttpEventType.UploadProgress:
            console.log(event);
            this.fileStatus.percentage = Math.round(100 * event.loaded / event.type);
            this.fileStatus.status = 'progress';
            console.log(this.fileStatus);
            break;

          case HttpEventType.Response:
            if (event.status === 200) {
              console.log(event);
              this.fileStatus.percentage = 0;
              this.fileStatus.status = 'done';
              console.log(this.fileStatus);
              break;
            }
            break;
        }


      },
      (error) => console.log(error),
      () => console.log(' deleted user')
    );

  }
}
