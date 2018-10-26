function importKey(prvKeyInp){
    provide = prvKeyInp;
    eos = Eos(config);
    eos.getCurrencyBalance({ code: "eosio.token", account: "chen12312312", symbol: "DEV" }).then(result => console.log(result))
}
//获取账号信息
function getAccInfo(acc) {
    if($.trim(acc)==''){
        //alert(m_msg.e1000002);
        layer.msg(m_msg.e1000002);
        return;
    }
    eos.getAccount({account_name: acc}).then(result =>{
        //console.log(result);
        setViewForm(result);
        user_acc=acc;
        $('.boxMan').removeClass('hide');
    }).catch(error=>{
        if(typeof error != "object"){

            error = JSON.parse(error);
            console.log(error);
            console.log(error.message);
        }
        //console.log(eval(error));
        //资产输入错误
        error=" "+error+" ";
        error=JSON.parse(error.substr(error.indexOf(':')+1));

        if(error.message.indexOf(m_msg.e1000000) != -1){
            //console.log(mMsg['3010011']);
            console.log(m_msg.e3010011);
            return ;
        }else{
            switch(error.error.code){
                case 0:
                    layer.msg(m_msg.e1000002);
                    return ;
                    break;
                case 3010001:
                    layer.msg(m_msg.e1000002);
                    return ;
                    break;
            }
        }
    });
}
//设置页面信息
function setViewForm(o){
    $('.boxlogin').addClass('hide');

    var infoAccTag=new Array(
            'acc_account_name',
            'acc_created',
            'acc_core_liquid_balance',
            'acc_ade','acc_cpu_available',
            'acc_cpu_max',
            'acc_cpu_used',
            'acc_cpu_weight',
            'acc_net_available',
            'acc_net_max',
            'acc_net_used',
            'acc_net_weight',
            'acc_ram_quota',
            'acc_ram_usage',
    );
    var infoAccVal=new Array(
            o.account_name,
            o.created,
            o.core_liquid_balance,
            '---',
            o.cpu_limit.available,
            o.cpu_limit.max,
            o.cpu_limit.used,
            o.total_resources.cpu_weight,
            o.net_limit.available,
            o.net_limit.max,
            o.net_limit.used,
            o.total_resources.net_weight,
            o.total_resources.ram_bytes,
            o.ram_usage,
    );
    var acc_permissions=o.permissions;
    console.log(acc_permissions[0].required_auth.keys[0].key);
    eos.getCurrencyBalance({ code: Contract_Name, account: o.account_name}).then(result =>{
        if (result.length>0){
            infoAccVal[3]=result[0];
        }
        for(var i=0;i<infoAccTag.length;i++){
            if(infoAccVal[i]){
                $('#'+infoAccTag[i]).text(infoAccVal[i]);
            }
        }

        //权限赋值
        var html='';
        for(var ul_i=0;ul_i<acc_permissions.length;ul_i++){
            var ul_ii_html='';
            for(var ul_ii=0;ul_ii<acc_permissions[ul_i].required_auth.keys.length;ul_ii++){
                ul_ii_html+='<li><strong>kye:</strong><span>'+acc_permissions[ul_i].required_auth.keys[ul_ii].key+'</span><strong class="jg_5" >weight:</strong><span>'+acc_permissions[ul_i].required_auth.keys[ul_ii].weight+'</span></li>\n';
            }
            var ul_ii1_html='';
            for(var ul_ii1=0;ul_ii1<acc_permissions[ul_i].required_auth.accounts.length;ul_ii1++){
                ul_ii1_html+='<li><strong>actor:</strong><span>'+acc_permissions[ul_i].required_auth.accounts[ul_ii1].permission.actor+'</span><strong class="jg_5">permission:</strong><span>'+acc_permissions[ul_i].required_auth.accounts[ul_ii1].permission.permission+'</span></li>\n';
            }
            html+='<ul class="kuai_1">\n' +
                '<li><strong>keyType:</strong><span id="acc_perm_name">'+acc_permissions[ul_i].perm_name+'</span></li>\n' +
                '<li><strong>threshold:</strong><span id="acc_threshold">'+acc_permissions[ul_i].required_auth.threshold+'</span></li>\n' +
                '<li>\n' +
                '<strong>publicKey:</strong>\n' +
                ' <ul >\n' +
                ul_ii_html +
            ' </ul>\n' +
            '</li>\n' +
            '<li>\n' +
            ' <strong>accounts:</strong>\n' +
            ' <ul id="acc_accounts">\n' +
            ul_ii1_html +
            ' </ul>\n' +
            '</li>\n' +
            '</ul>';
        }
        $('#acc_permissions').html(html);


    });
}
//代币类型选择切换
function changeToken(type){
    $('#t_type').attr('t-type',type);
    $('#t_type .tokenName').text(type);
}
//执行eos合约及方法 PUSH
//contractName 和约名,如果是eos转账的话是eosio.token官方合约
//actionName 方法名 比如转账是 transfer

function Eos_transaction(contractName,actionName,authorization,data,val){
    console.log(contractName);
    console.log(actionName);
    console.log(authorization);
    console.log(data);
    console.log(val);
    // eos.transaction({
    //         actions: [{
    //                 account: 'eosio.token',//如果是转账的话 eos的官方token
    //                 name: 'transfer',//方法名
    //                 authorization: [{
    //                     actor: '发送方帐号',//执行账号
    //                     permission: 'active'//授权 权限
    //                 }],
    //                 data: {//如果是转账的话 需要 from to....等参数 如果是执行合约方法的话 就是合约方法参数
    //                     from: '发送方帐号',
    //                     to: '接收方帐号',
    //                     quantity: '0.3000 DEV',
    //                     memo: '备注'
    //                 }
    //             }
    //         ]
    // });
    config.keyProvider=val;
    // console.log(config);
    var eos = Eos(config);
    eos.transaction({
        actions: [{
            account: contractName,//如果是转账的话 eos的官方token
            name: actionName,//方法名
            authorization: [authorization],
            data: data
        }]
    }).then(result => {
        console.log(result);
        console.log(result.transaction);
        getAccInfo(user_acc);
        alertBootomPop(result.transaction_id);

    }).catch(error=>{
        if(typeof error != "object"){
            error = JSON.parse(error);
            console.log(error);
            console.log(error.message);
            return;
        }
        console.log(error.message);return;
        //console.log(eval(error));
        //资产输入错误
        error=" "+error+" ";
        error=JSON.parse(error.substr(error.indexOf(':')+1));

        if(error.message.indexOf(m_msg.e1000000) != -1){
            //console.log(mMsg['3010011']);
            console.log(m_msg.e3010011);
            return ;
        }else{
            switch(error.error.code){
                case 0:
                    layer.msg(m_msg.e1000002);
                    return ;
                    break;
                case 3010001:
                    layer.msg(m_msg.e1000002);
                    return ;
                    break;
            }
        }
    });
}
function alertBootomPop(id){
    $('.footer_pop').removeClass('hide');
    $('.footer_pop > .bottom-hint-content > p').text(id);
    $('.transaction_send_show_btn').attr('href',transactionInfoLink+id);

}