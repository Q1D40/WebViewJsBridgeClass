/**
 * 模拟类
 * 构造函数
 **/
function Class(){}

/**
 * 继承方法
 **/
Class.prototype.extend = function(Child, Parent){
    var F = function(){};
　　F.prototype = Parent.prototype;
　　Child.prototype = new F();
　　Child.prototype.constructor = Child;
　　Child.uber = Parent.prototype;
}

// 模拟类对象
var clas = new Class();

/**
 * 基础类
 * 构造函数
 **/
function Base(){
    this.checkOS();
}

/**
 * 设备平台
 **/
Base.prototype.OS = {};
Base.prototype.callBackFuncSucPostfix = "_suc";
Base.prototype.callBackFuncErrPostfix = "_err";

/**
 * 构造回调方式
 **/
Base.prototype.createCallBack = function(funcName, callBack){
    eval("Base.prototype." + funcName + " = function(res){callBack(res);}");
};

/**
 * 检测设备平台
 **/
Base.prototype.checkOS = function(){
    var ua = navigator.userAgent.toLowerCase();
	if (/iphone|ipad|ipod/.test(ua)){
        this.OS = new IOS();
    }else if(/android/.test(ua)){
        this.OS = new Android();
    }else{
        alert("非法入口");
    }
}

/**
 * IOS类
 * 构造函数
 **/
function IOS(){
    this.iframe = document.createElement("iframe");
    document.body.appendChild(this.iframe);
    this.iframe.setAttribute("style","display:none;");
}

/**
 * iframe对象
 **/
IOS.prototype.iframe = null;

/**
 * 测试
 **/
IOS.prototype.nativeFunction = function(param, suc, err){
    var src = "dev6666://nativeFunction?param=" + param + "&suc=" + suc + "&err=" + err + "";
    this.iframe.setAttribute("src", src);
};

/**
 * Android类
 * 构造函数
 **/
function Android(){}

/**
 * 测试
 **/
Android.prototype.nativeFunction = function(param, suc, err){
    window.wst.nativeFunction(param, suc, err);
};

/**
 * 桥接类
 * 构造函数
 **/
function Wb(){
    this.constructor.uber.constructor();
}

/**
 * 继承Base类
 **/
clas.extend(Wb, Base);

/**
 * 类名
 **/
Wb.prototype.callBackPrefix = "wb.";

/**
 * 测试
 **/
Wb.prototype.nativeFunction = function(param){
    var callBackSuc = "nativeFunction" + this.callBackFuncSucPostfix;
    var callBackErr = "nativeFunction" + this.callBackFuncErrPostfix;

    this.createCallBack(callBackSuc, param.suc);
    this.createCallBack(callBackErr, param.err);

    this.OS.nativeFunction(param.param, this.callBackPrefix + callBackSuc, this.callBackPrefix + callBackErr);
};

// 创建桥接对象
var wb = new Wb();
