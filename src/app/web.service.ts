import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';

@Injectable()
export class WebService {
    imagepath: any = [];
    image_list: any = [];
    filePath: any = [];
    social_list: any = [];
    user_list: any = [];
    log_list: any =[];
    user_data: any =[];
    postId: any = [];
    comment_list: any = [];
    login_list: any = [];
    post_list: any = [];
    Follower_list: any = [];
    feed: any;
  
    
   
    RAI = "https://prod-10.eastus.logic.azure.com:443/workflows/f0f10759bc214b6a966eaa515221d4c2/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=GLLP5QS106_aDywKuV8kmWH0pLeNlq-EXmuKcOkrS3o";
    BLOB_ACCOUNT = "https://blobstoragecom682.blob.core.windows.net";

    IUPS = "https://prod-78.eastus.logic.azure.com:443/workflows/6b4db85fd1c64c53b7790ad5e99e2064/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=lY1aoLHSCkadKsPAK-jQkJcKJtqntEHofXZEsTNhD8I";
    
    GetAllSocial = "https://prod-77.eastus.logic.azure.com:443/workflows/a08d4dc276b3438aa750c756fd1e1146/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Bod3zSdDMX7aSoRSOc5UlfZJfFMPTxJM-BqsG9zp21k";
    getOnePost ="https://prod-40.eastus.logic.azure.com/workflows/6fc7499192544a83a85b3c8fdfb5867f/triggers/manual/paths/invoke/post/{id}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=27z625za_rNn1NynuU31jgJcbZzra-2AP2t3sw2qQow";

    GetAllUsers = "https://prod-59.eastus.logic.azure.com:443/workflows/c95c6e0e607e4a32bd211029f53376a4/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=3r_nq87o4g6voVI-jwrMI3SizB9Klql8bt1lCufe3xA";
    postNewUsers = "https://prod-26.eastus.logic.azure.com:443/workflows/63ff1521c9834a20bc1f82d914167421/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=TP0aeDtDfu17o3hpkT5iaI4P4wXaKsyHVWlwgk4Vyx0";
    getOneUser1= "https://prod-91.eastus.logic.azure.com/workflows/c3617b1295dd49768f29c71beaa4a139/triggers/manual/paths/invoke/user/";
    getOneuser2= "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Xp1Rdft7Gof1Jhc2RRLx1MIkHcPzoMdZ3x6DYIaIK_4";
    
    getComments1 = "https://prod-55.eastus.logic.azure.com/workflows/ff81daef4f8d4cb6823c6ccc1f5c69ea/triggers/manual/paths/invoke/comment/";
    getComments2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Tt_AguRdpL9xugBGXPPSkcY8wSizuGRkSocJWXgWOKQ";
    postComment ="https://prod-72.eastus.logic.azure.com/workflows/97f83226876d40cf8081a5bc183924c5/triggers/manual/paths/invoke/comments?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=RKnqUb3372lmAYoOjfl2f-Kr_Lbfw4xG9WDDRo3s-zk"
    
    GetLoginDetails1 = "https://prod-21.eastus.logic.azure.com/workflows/5353b7a7431849f6a40e0182078e5e1c/triggers/manual/paths/invoke/signin/";
    GetLoginDetails2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=twDHu10f4P_7Ir-F3Xc-0TZ8X4W0pSDTP8CueuzADyI";

    GetUserFollowers1 = "https://prod-33.eastus.logic.azure.com/workflows/4e3bb675d0694ea595de175928a7c95b/triggers/manual/paths/invoke/user/followers/"
    GetUserFollowers2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=uVWlfBXFyrbqwm6nscuCSguDLln50bj4eNTiXRFjZkc"

    GetUserFeed1 = "https://prod-74.eastus.logic.azure.com/workflows/adbac680f5ae434782cd8551c2b72d52/triggers/manual/paths/invoke/followers/"
    getUserFeed2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=GPcW-ZqY4SE7TUOu_reI7ymPGjpcW6ZkzCOHHdxZmJU"

 constructor(private http: HttpClient) {

 }

 getImages() { 
    return this.http.get(this.RAI).subscribe((response: any) => {
        this.imagepath = this.BLOB_ACCOUNT;
        this.image_list = response;
        })
}

getSocial() { 
    return this.http.get(this.GetAllSocial).subscribe((response: any) => {
        this.imagepath = this.BLOB_ACCOUNT;
        this.social_list = response;
        })
    }

getUsers() { 
    return this.http.get(this.GetAllUsers).subscribe((response: any) => {
        this.user_list = response;
        })
    }

getOneUser(id: any){
    return this.http.get(this.getOneUser1 +id+ this.getOneuser2).subscribe((response: any) => {
        this.log_list = response;
    })   
}

getAllComments(postID: any){
    return this.http.get(this.getComments1 +postID+ this.getComments2).subscribe((response: any) => {
        this.comment_list = response;
        console.log(response)
    })
}

getLogin(userName: any, pass: any){
    return this.http.get(this.GetLoginDetails1 + userName + "/" + pass + this.GetLoginDetails2).subscribe((response: any) => {
        this.login_list= response;
        console.log(this.GetLoginDetails1 + userName + "/" + pass + this.GetLoginDetails2);
        console.log(this.login_list)
        sessionStorage.setItem('loginId',this.login_list[0].id);
        console.log(this.login_list[0].id)
})
}

get1Post(id: any){
    return this.http.get(this.getOnePost).subscribe((response: any) => {
        this.post_list = response;
    })

}

getUserFollowers(){
    return this.http.get(this.GetUserFollowers1 + sessionStorage.getItem('loginId') + this.GetUserFollowers2).subscribe((response: any) => {
        this.Follower_list = response[0].followersOf
        var test = this.Follower_list.split(',');
        this.feed = test.join('","');
        console.log(response)
        this.GetUserFeed()
    })
}

GetUserFeed(){
    
    return this.http.get(this.GetUserFeed1 + this.feed + this.getUserFeed2).subscribe((response: any) => {
        this.Follower_list = response;
        //console.log(this.feed)
        console.log(response)
})
}

}