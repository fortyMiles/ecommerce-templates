swfobject.addDomLoadEvent(function () {
    var swf = new fullAvatarEditor("fullAvatarEditor.swf", "expressInstall.swf", "change_img", {
            id : "swf",
            upload_url : "/designer/u_img",
            method : "post",

            src_upload : 2
        }, function (msg) {
            if(msg.code == 5){
                if(msg.type == 0){
                    if(msg.content.sourceUrl){
                        alert("原图片已成功保存至服务器，url为：\n" +　msg.content.sourceUrl);
                    }
                    alert("头像已成功保存至服务器，url为：\n" + msg.content.avatarUrls.join("\n"));
                }
            }
        }
    );
});