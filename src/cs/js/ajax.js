function public(dom,json){
    this.dom = dom;
    this.defaults = {
        url: window.location.href  || '',
        area: '北京',
        sentence: '',
        type: ''
    }
    this.json = $.extend(this.defaults,json);
}

public.prototype.post=function(fn){
    var obj = this.json;
    var url = obj.url;
    var area = obj.area;
    console.log("新加测试");
    var sentence = obj.sentence;
    var type = obj.type;
    var dom = this.dom;

    var submitted = false;

    var username = $(".shurunamea").val();
    var specialty = $(".shuruzya").val();
    var phone =$('.yxCrmTel').val();
    console.log(phone);
    if(username == "") {
        alert("姓名不能为空！");
        $(".shurunamea").focus();
        return false;
    } else if(phone == "") {
        alert("手机号码不能为空！");
       $('.yxCrmTel').focus();
        return false;
    } else if(!(/^(((13[0-9]{1})|(16[0-9]{1})|(19[0-9]{1})|(15([0-9]{1}))|(18[0-9]{1})|(17+(0|1|2|4|5|3|6|7|8))|(14+(5|6|7|8|9)))+\d{8})$/.test(phone))) {
        alert("手机号码输入错误！");
       $('.yxCrmTel').focus();
        return false;
    }else if ($('.tijiao').attr('disabl') == 'disabl') {
        console.log('不能多次点击');
        return false;
    }

    var myData = '';
    if (type == '') {
        myData = "op=add&username=" + username + "&specialty=" + specialty + "&phone=" + phone + "&area=" + area + "&url=" + url + "&keyword=" + keywords;
    } else {
        myData = "op=add&username=" + username + "&specialty=" + specialty + "&phone=" + phone + "&area=" + area + "&url=" + url + "&kemu_type=" + type+ "&keyword=" + keywords
    }
    $('.tijiao').attr('disabl','disabl');
    $.ajax({
        type: "POST",
        url: "/tg_member/tg_user/ajax.php",
        data: myData,
        success: function (e) {
            $('.tijiao').removeAttr('disabl');
            if (e == 1) {
                if(sentence != ''){
                    eval(sentence);
                }
                submitted = true;
                if(fn){
                    fn(submitted);
                }
                alert("恭喜您，提交成功！5分钟之內未收到短信将会有专业老师与您电话联系");
            } else if (e == 2) {
                if(fn){
                    fn(submitted);
                }
                alert("此用户已提交过了！");
            } else if (e == 3) {
                if(fn){
                    fn(submitted);
                }
                alert("此手机号已提交过了！");
            } else {
                alert("提交失败！");
console.log("error");
            }
        }
    });
}