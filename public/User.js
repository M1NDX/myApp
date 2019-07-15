class User{

    constructor(username, email, password, sexo='F', hobbies=[]){ 
        this.id = ++User.count;
        this.username = username;
        this.email = email;
        this.password = password;
        this.hobbies = hobbies;
        this.sexo = sexo;
        this.url = "https://randomuser.me/api/portraits/"
                  +(sexo=='F'?"women":"men")+"/"+this.id+".jpg"
    }
}

User.count =0;



