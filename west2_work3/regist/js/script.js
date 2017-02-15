function getLength(str)
{
	return str.replace(/[^\x00-xff]/g,"xx").length;  //\x00-xff   表示所有单字节
}

function findStr(str,n)
{
	var tmp = 0;
	for(var i=0 ; i<str.length ; i++)
	{
		if(str.charAt(i)==n)
			tmp++;
	}
	return tmp;
}

$(document).ready(function ()
{
	var aInput = document.getElementsByTagName("input");
	var oName = aInput[0];
	var pwd = aInput[1];
	var pwd2 = aInput[2];
	var aP = document.getElementsByTagName('p');
	var name_msg = aP[0];
	var pwd_msg = aP[1];
	var pwd2_msg = aP[2];
	var count = document.getElementById('count');
	var name_length = 0;

//1.数字，字母
//2.5-25字符，推荐使用中文会员名
	var re = /[^\w]/g;

//用户名
	oName.onfocus = function()
	{
		name_msg.style.display = "inline-block";
		name_msg.innerHTML = '<i class = "ati"> </i>5-25个字符，由字母和数字组成'
	}

	oName.onkeyup = function() //当键盘弹起时
	{	
		count.style.visibility = "visible";
		name_length = getLength(this.value);
		count.innerHTML = name_length + "个字符";
		if(name_length == 0)
		{
			count.style.visibility = "hidden";
		}
	}

	oName.onblur = function()
	{
		//含有非法字符
		var re = /[^\w]/g;
		if(re.test(this.value))
		{
			name_msg.innerHTML = '<i class="err"</i>含有非法字符！';
		}
		//不能为空
		else if(this.value == "")
		{
			name_msg.innerHTML = '<i class= "err" </i>不能为空！'
		}
		//长度超过25个字符
		else if(name_length>25)
		{
			name_msg.innerHTML = '<i class= "err" </i>长度超过25个字符！'

		}
		//长度少于6个字符
		else if(name_length<6)
		{
			name_msg.innerHTML = '<i class= "err" </i>长度小于6个字符！'		
		}
		//OK
		else
		{
			name_msg.innerHTML = '<i class= "ok" </i>OK'		
		}
	}
	//表单验证
	$('input[name="loginbtn"]').click(function(event)
	{
		var $name = $('input[name="username"]');
		var $password = $('input[name="password"]');
		var $verify = $('input[name="verify"]');
		var $text = $('#text');
		var _name = $.trim($name.val());
		var _password = $.trim($password.val());
		var _verify = $.trim($verify.val());
		var _namelen = $('input[name="username"]').value.length;

		if(_name == '')
		{
			$text.text('请输入用户名！');
			$name.focus();
			return;
		}

		if(_password == '')
		{
			$text.text('请输入密码！');
			$passname.focus();
			return;
		}

		if(_verify == '')
		{
			$text.text('请输入验证码！');
			$verify.focus();
			return;
		}
		if(_namelen == 4)
		{
			$text.text('Well Done！');
			$verify.focus();
			return;
		}

		$text.text( $('input[name="username"]').val.length());
	})

//密码
	pwd.onfocus = function()
	{
		pwd_msg.style.display= "inner-block";
		pwd_msg.innerHTML = '<i class="ati"</i>6-16个字符，请使用字母加数字或符号的组合'
	}

	pwd.onkeyup = function()
	{
		pwd2_msg.style.display="inner-block";
	}

	pwd.onblur = function()
	{
		var m = findStr(pwd.value,pwd.value[0]);
		var re_n = /[^\d]/g;
		var re_t = /[^a-zA-Z]/g;
		//不能为空
		if(this.value=="")
		{
			pwd_msg.innerHTML = '<i class= "err"></i>不能为空';
		}
		//不能用相同的字符
		else if (m==this.value.length)
		{
			pwd_msg.innerHTML = '<i class= "err"></i>不能用相同的字符';
		}
		//长度应为6-16个字符
		else if(this.value.length<6  || this.value.length>16)
		{
			pwd_msg.innerHTML = '<i class= "err"></i>长度应为6-16个字符';
		}
		//不能全为数字
		else if(!re_n.test(this.value))
		{
			pwd_msg.innerHTML = '<i class= "err"></i>不能全为数字';
		}
	
		//不能全为字母
		else if(!re_t.test(this.value))
		{
			pwd_msg.innerHTML = '<i class= "err"></i>不能全为字母';
		}
		//OK
		else 
		{
			pwd_msg.innerHTML = '<i class= "ok"></i>OK';
		}
	}

//确认密码

	pwd2.onblur = function()
	{
		if(this.value!=pwd.value)
		{
			pwd2_msg.innerHTML = '<i class = "err"></i>两次输入的密码不一致！';
		}
		else    pwd2_msg.innerHTML = '<i class = "err"></i>OK';
	}
})