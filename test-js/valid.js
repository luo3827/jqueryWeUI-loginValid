fnGetValidExpress = function(){
	var validAry = new Array();
		// validAry.push({'id':'qyxx_base29','clas':'date'});
		 //validAry.push({'id':'qyxx_ggrq','clas':'date'});
		 validAry.push({'id':'qyxx_base02','clas':'required'});
//	 		 validAry.push({'id':'qyxx_shgzxym','clas':'required'});
		 validAry.push({'id':'qyxx_shgzxym','clas':'unified_code'});
		 validAry.push({'id':'qyxx_base01','clas':'frdm_code'});
		 validAry.push({'id':'qyxx_base051','clas':'required'});
		 validAry.push({'id':'qyxx_base24','clas':'date'});
		 validAry.push({'id':'qyxx_lxyx','clas':'email'});
		 validAry.push({'id':'qyxx_fzrdh','clas':'phone'});
		 validAry.push({'id':'qyxx_sj','clas':'phone'});
		 validAry.push({'id':'qyxx_dh','clas':'phone'});
		 validAry.push({'id':'qyxx_bgscz','clas':'dh'});
		 validAry.push({'id':'qyxx_havingLand','clas':'money'});
		 validAry.push({'id':'qyxx_base08','clas':'number'});
		 validAry.push({'id':'qyxx_base081','clas':'number'});
		 validAry.push({'id':'qyxx_base082','clas':'number'});
		 validAry.push({'id':'qyxx_base083','clas':'number'});
		 validAry.push({'id':'qyxx_base141','clas':'number(20)'});
		 validAry.push({'id':'qyxx_base142','clas':'number(20)'});
		 validAry.push({'id':'qyxx_base144','clas':'number(20)'});
		 validAry.push({'id':'qyxx_base145','clas':'number(20)'});
		 validAry.push({'id':'qyxx_base146','clas':'number(20)'});
		 validAry.push({'id':'qyxx_base204','clas':'number(20)'});
		 validAry.push({'id':'qyxx_base14','clas':'number(20)'});
		 validAry.push({'id':'qyxx_base231','clas':'number(20)'});
		 validAry.push({'id':'qyxx_base07Pcode','clas':'yb'});
		 validAry.push({'id':'qyxx_base26','clas':'yb'});
		 validAry.push({'id':'qyxx_base09','clas':'money'});
		 validAry.push({'id':'qyxx_bgsdh','clas':'dh'});
		 validAry.push({'id':'qyxx_szyqdm','clas':'required'});
		 validAry.push({'id':'qyxx_ggrq','control':'qyxx_base36','rules':'required date',});
		 validAry.push({'id':'qyxx_base271','control':'qyxx_base27','rules':'required',});
		 validAry.push({'id':'qyxx_havingLand','control':'qyxx_base37','rules':'required number(20)',});
		 validAry.push({'id':'qyxx_base06','control':'qyxx_gxenterprise','rules':'required',});
		 validAry.push({'id':'qyxx_base29','control':'qyxx_gxenterprise','rules':'required date',});
		 validAry.push({'id':'qyxx_rjqyzsh','control':'qyxx_sfenterprise','rules':'required',});
		 validAry.push({'id':'qyxx_wsdwm','control':'qyxx_sfwsdw','rules':'required',});
		 validAry.push({'id':'qyxx_base301','control':'qyxx_base30','rules':'required',});
		 validAry.push({'id':'tydm','other':'--','rules':'unified_code',});
	return validAry;
}
// 数据校验
var fnValidationForm = function(){
	$("ul li.error").removeClass("error");
	$("ul div.error").removeClass("error");
	$('ul div.error-tips.active').removeClass('active');
	var validAry = new Array(), $input, valid={}, firstErrId='', clasAry = new Array(),key = '', field = '',ctrid='',comparFlag=false,refParam={};
	validAry = fnGetValidExpress();
	 jJyjgxx = {};
	var bool=true;
	if(validAry){
		for(var idx in validAry){
			comparFlag = false;
			valid = {};
			valid = validAry[idx];
			field = valid['id'];
			$input = $('#'+field);
			if(valid['clas']){
				clasAry = valid['clas'].split(' ');
				for(var clasIdx in clasAry){
					key = clasAry[clasIdx];
					var validErrMsg = fnValidVal($input, key);
					if(validErrMsg){
								 refParam = {rule:validErrMsg, state:false};
								 comparFlag = true;
								 break;
							}
				}
				   if(comparFlag){
						if(!firstErrId){
						   firstErrId = field;
					 }
					  $input.parent().addClass('error');
					  addErrorTip(field, refParam);
					  refParam['type'] = valid['type'];
					  jJyjgxx[field] = refParam;
					  refParam['type'] = valid['type'];
				 }
			}
			else if(valid['control']){
				 ctrid = valid['control'];
				  var val=$('#'+ctrid).val();

				  if(val=='是'|| val=='1')
				  {
					  clasAry = valid['rules'].split(' ');
					   for(var clasIdx in clasAry){
							key = clasAry[clasIdx];
							var validErrMsg = fnValidVal($input, key);
							if(validErrMsg){
								 refParam = {rule:validErrMsg, state:false};
								 comparFlag = true;
								 break;
							}
						}
						if(comparFlag){
							if(!firstErrId){
							   firstErrId = field;
							}
						  $input.parent().addClass('error');
						  addErrorTip(field, refParam);
						  refParam['type'] = valid['type'];
						  jJyjgxx[field] = refParam;
						 refParam['type'] = valid['type'];
					  }
				}
			}else if(valid['other']){
					var frdm=$('#qyxx_base01').val();
					var tydm=$('#qyxx_shgzxym').val();
					frdm=frdm.replace("-", "");
					if(tydm==''&&frdm==''){
						 refParam = {rule:'组织机构代码和统一社会信用代码二者必须填一项!', state:false};
						 comparFlag = true;
						 field='qyxx_base01';
						 $input = $('#'+field);
					}
					if(tydm!=''&&frdm!=''){
						 tydm=tydm.substring(8, 17);
						 if(tydm!=frdm)
						 {
							refParam = {rule:'组织机构代码和统一社会信用代码不对应!请检查!', state:false};
							 comparFlag = true;
							 field='qyxx_shgzxym';
							 $input = $('#'+field);
						 }
					}
					if(comparFlag){
						if(!firstErrId){
						   firstErrId = field;
						}
					  $input.parent().addClass('error');
					  addErrorTip(field, refParam);
					  refParam['type'] = valid['type'];
					  jJyjgxx[field] = refParam;
					   refParam['type'] = valid['type'];
				 }
			}
		}
	if(firstErrId){
		fnStepActByIputId('#'+firstErrId);
	}
	}
   if($.isEmptyObject(jJyjgxx)){
		return true;
	}
	return false;
}
	// 根据文本框ID展示对应步骤
var fnStepActByIputId = function(select){
	var $input = $(select), $tbody, topval = 0;
	$tbody = $input.closest('div.tbody');
	if($tbody.length>0){
		var stepIdx = $qyxxForm.children('div.tbody').index($tbody);
		$(".tabs li.active").removeClass("active");
		$(".tabs li").find("div.top").css("marginTop",'0');
		$('.tabs>ul>li').eq(stepIdx).addClass("active").find("div.top").css("marginTop",'-40px');
		$("div.tbody").removeClass("current");
		var ac="step"+(stepIdx+1);
		$("div.tbody"+"."+ac).addClass("current");
		//减掉头部距离
		topval = $input.closest('ul').offset().top-280;
		if(topval<0){
			topval = 0;
		}
		$(document).scrollTop(topval);
		$input.siblings("div").has('b.ex').addClass('active');
	}
}
var fnValidVal = function(obj, type, v){
	var val = '', msg = '';
	if(v){
		val = v;		
	}else if($(obj).length<1){
		return false;
	}else{
		val = $(obj).val();
	}
	var result = false;
	var validErrMsg = {
    	'required': '不能为空!',
    	'phone': '无效的手机号码!',
    	'email': '无效的电子邮件!',
    	'url': '无效的网址!',
    	'cz': '无效的传真号!',
    	'money': '无效的数字!',
    	'number':'请输入数字!',
    	'yb':'无效的邮编码!',
    	'dh':'无效的电话号!',
    	'tel': '无效的电话号!',
    	'date': '无效的日期，格式：2016-01-01!',
    	'year_month': '无效的时间，格式：201601',
    	'number(10)': '无效的数值，应为十位有效数字！',
    	'number(20)': '无效的数值，应为二十位有效数字，整数部分最大十八位！',
    	'unified_code': '无效，统一信用代码格式：123456789012345678；',
    	'frdm_code': '无效，组织机构代码格式：12345678-9；',
        'pwd':'密码必须为6位以上数字字母组合',
    	'hanzi': '请输入汉字！',
    	'amount':'数字必须大于0!',
    	'stock': '无效的股票代码！'
    };
	if(!val){
		val = '';
	}
	switch (type){
		case 'required': { 
			if(val.length>0){
				result = true;
			}
            break;
        }
		case 'phone': { 
			if(val==''|| /(^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|16[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$|19[0-9]{9}$)|(^(\d{7,8})$)/.test(val)){
				result = true;
			}
			break;
        }
		case 'email': { 
			if(val==''|| /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(val)){
				result = true;
			}
			break;
        }
		case 'url': { 
			if(val==''|| /^(http(s)?:\/\/)?(www\.)?[\w-]+\.\w{2,4}(\/)?$/.test(val)){
				result = true;
			}
			break;
        }
		case 'date': {
//			if(/^(\d{4})-(\d{2})-(\d{2})$/.test(val)|| val==''){
			if(/^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)$/.test(val)|| val==''){
				result = true;
			}
			break;
        }
		case 'cz': {
			if(/^(\d{3,4}-)?\d{7,8}$/.test(val) || val==''){
				result = true;
			}
			break;
        }
		case 'money': {
			//  /^[0-9]+(.[0-9]{1,})?$/.test(val) || val==''
			if(/^[0-9]+(.[0-9]{1,3})?$/.test(val) || val==''){
				result = true;
			}
			break;
        }
		case 'number': {
			if(/^[0-9]*$/.test(val) || val=='' ){
				result = true;
			}
			break;
        }
		case 'yb': {
			if(/^[1-9][0-9]{5}$/.test(val)|| val==''){
				result = true;
			}
			break;
        }
		case 'dh': {
			if(/(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/.test(val)|| val==''){
				result = true;
			}
			break;
        }
		case 'tel': {
			if(/(^(0\d{2})-(\d{8})$)|(^(0\d{3})-(\d{7})$)|(^(0\d{2})-(\d{8})-(\d+)$)|(^(0\d{3})-(\d{7})-(\d+)$)/.test(val)|| val==''){
				result = true;
			}
			break;
        }
		case 'year_month': {
			if(/^(\d{4})(\d{2})$/.test(val)|| val==''){
				result = true;
			}
			break;
        }
		case 'number(10)': {
			if(/^([0-9]{10})$/.test(val) || val==''){
				result = true;
			}
			break;
        }
		case 'number(20)': {
			if(/^((-?[0-9]{1,18})|(-?[0-9]{1,17}(\.[0-9]{1,})))$/.test(val) || val==''){
				result = true;
			}
			break;
        }	
		case 'amount': {
			if(/^\+?[1-9]\d*$/.test(val) || val==''){
				result = true;
			}
			break;
        }
		case 'unified_code': {
		   // if(/^([A-Za-z0-9]{18})$/.test(val) || val==''){
		   if(/^([A-Za-z0-9]{2})$/.test(val) || val==''){
				result = true;
		   }
			break;
        }
		case 'frdm_code': {
		   if(/^(([A-Za-z0-9]{8}-([A-Za-z0-9])))$/.test(val) || val==''){
				result = true;
		   }
			break;
        }
		case 'hanzi': {
			if(/^[\u4e00-\u9fa5]+$/.test(val) || val==''){
				result = true;
			}
			break;
        }
		case 'stock': {
			if(/^[0-9]{6}\.[a-zA-Z]{1,4}$/.test(val) || val==''){
				result = true;
			}
			break;
        }
        case 'pwd': {
            if(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(val)){
                result = true;
            }
            break;
        }
	}
	if(!result){
		msg = validErrMsg[type];
	}

	return msg;
}
function addErrorTip(par1, data) {
	         
	var text1 = data.rule,
	text2;
	var $this = $("#" + par1);
	//    $this.parent().find('div.error-tips').remove();
	$this.siblings("div.error-tips").remove();
	if (data.state) {
			text2 = "说明情况"
			text1 = text1 + "，请";
	}
	var $div = $('<div class="error-tips ' + (data.show ? 'active': '') + '"> <div> <p></p>' + (data.ref ? '<h4>相关数据：</h4>': '') + '</div><i></i> </div>');
	var $b = $('<b class="ex"></b>').text(text2);
	$div.find("div>p").text(text1);
	$div.find("div>p").append($b);
	$div.find("div>p").append("<span></span>");
	$this.parent().append($div);
}