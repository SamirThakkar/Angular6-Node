global.MongoORM.User.findOne({"isRootUser": true}, (error, user) => {
    if (user == null || !user) {
        let rootUser = new global.MongoORM.User();
        rootUser.name= "Admin";
        rootUser.password= Utils.md5('12345678');
        rootUser.email= "admin@admin.com";
        rootUser.username= "Admin";
        rootUser.isRootUser= true;
        rootUser.save().then((rootUserResponce) => {
            console.log('Username :: ', rootUserResponce.username);
            console.log('Email :: ', rootUserResponce.email);
            console.log('Password :: 12345678');
        }).catch((rootUserError) => {
            console.log('rootUserError', rootUserError);
        });
    }else{
        console.log('Username :: ', user.username);
        console.log('Email :: ', user.email);
        console.log('Password :: 12345678');
    }
});