var isBtnYz=false;// 是否是点击注册或者登录按钮验证，默认false
function yz_input(t,typeArr,msgAdd){ // 传入验证的类型数组,传入要给必填加的msg文字
    var msg_yz="";
    $.each(typeArr,function(index,value){
        if(value == "passWordIsSame"){
            msg_yz=isSame();
        }else{
            msg_yz=fnValidVal(t,value);
        }
        if(msg_yz!==""){//有msg_yz文字,说明有错误
            if(value== 'required'){
                msg_yz=msgAdd+msg_yz
            }
            if(isBtnYz){
                if($(".weui-toptips").length==0){
                    $.toptip(msg_yz);
                    //$.toast(msg_yz, "forbidden");
                }
            }else{
                $.toptip(msg_yz);
                //$.toast(msg_yz, "forbidden");
            }
            $(t).parents(".weui-cell").addClass('error-input');
            return false; // 跳出循环
        }
    });
    if(msg_yz== ""){
        $(t).parents(".weui-cell").removeClass('error-input');
    }
    console.log(msg_yz);
}
function yz_input_2(t,typeArr,msgAdd){ // 弹框提示错误，传入验证的类型数组,传入要给必填加的msg文字
    var msg_yz="";
    $.each(typeArr,function(index,value){
        if(value == "yzm"){
            msg_yz=yzmSame();
        }else{
            msg_yz=fnValidVal(t,value);
        }
        if(msg_yz!==""){//有msg_yz文字,说明有错误
            if(value== 'required'){
                msg_yz=msgAdd+msg_yz
            }
            if(isBtnYz){
                if($(".weui-toast").length==0){
                    $.toast(msg_yz, "forbidden");
                }
            }else{
                $.toast(msg_yz, "forbidden");
            }
            $(t).parents(".weui-cell").addClass('error-input-2');
            return false; // 跳出循环
        }
    });
    if(msg_yz== ""){
        $(t).parents(".weui-cell").removeClass('error-input-2');
    }
}

function isSame(){ // 验证密码是否输入一致
    var passWord= $("#passWord").val();
    var passWordConfirm= $("#passWordConfirm").val();
    var msg="";
    if(passWord!=""&&passWordConfirm!=""){ // 两个都不为空的时候验证是否一致
        if(passWord!=passWordConfirm){
            msg="两次密码不一致！"
        }else{
            $("#passWord").parents(".weui-cell").removeClass('error-input');
            $("#passWordConfirm").parents(".weui-cell").removeClass('error-input');
        }
    }
    return msg
}

$("#signUpBtn").click(function(){
    isBtnYz=true;
    $("#signUp input").blur();
    //isSame();
    var error_len = $("#signUp .error-input").length;
    if(error_len==0){
        isBtnYz=false;
        console.log("注册信息");
        console.log($("#J_signUp_form").serialize());
        window.location.href="msg.html"
    }else {
        isBtnYz=false;

    }
});

$("#loginBtn").click(function(){
    isBtnYz=true;
    $("#login input").blur();
    //yzmSame();
    var error_len = $("#login .error-input-2").length;
    if(error_len==0){
        isBtnYz=false;
        $.alert($("#J_login_form").serialize(),"登录成功！");
    }else {
        isBtnYz=false;
    }
});

function yzmSame(){
    var yzmVal= $("#yzm").val().toLowerCase();
    var yzmImgVal=$("#yzm-img").attr("data-value").toLowerCase();
    var msg="";
    if(yzmVal!=""&&yzmVal!=yzmImgVal){
        msg="验证码不正确";
    }
    return msg
}

/*
* 点击登录时需要调用的验证方法
* formObj ： form表单的json对象
* rules： 需要验证的类型 {type: ['required', 'pwd'], equalTo: 'password'}
*    rules.equalTo ： 验证相关对应字段的值是否相等
* message：验证的提示信息 {typeMsg: '确认密码', equalTo: '确认密码和新密码不一致'}
* formId ： 对应的form标签的id
* */
function formValid () {
    var formObj = arguments[0].data, rules = arguments[0].rules, message = arguments[0].message, formId = arguments[0].formId;
    console.log("formObj: ",formObj);
    console.log("rules: ",rules);
    console.log("message: ",message);
    console.log("formId: ",formId);
    var msg_yz = "";
    var errorList = [];
    $.each(formObj, function(index, value) {
        // 对所有对应的规则类型type进行验证
        if (rules[index]) {
            var rule = rules[index]; // 获取接收的规则独享rules对应的rule
            for (var V_type of rule.type) {
                var errMsg = fnValidVal(formId + " [name = \'"+ index+"\']", V_type, value);
                if(errMsg != "" && V_type == 'required'){
                    msg_yz = message[index].typeMsg + errMsg;
                }else {
                    msg_yz = errMsg;
                }
                if (msg_yz != '') break;
            }
            if (msg_yz == '' ) {
                // 验证规则类型type通过时，进行rule.equalTo 是否相等验证
                if (rule.equalTo) {
                    if (formObj[rule.equalTo] !== value) {
                        msg_yz = message[index].equalTo;
                    }
                }
                // 验证规则类型type通过时，对验证码是否正确验证
                if (index == 'yzm') {
                    msg_yz = yzmSame();
                }
            }
        }

        // errorList存储错误信息
        if (msg_yz != '') {
            errorList.push({msg: msg_yz, param: index});
        }
    })
    return errorList
}
