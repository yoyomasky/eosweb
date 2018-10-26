$(function(){
    // eos.getInfo({}).then(result=>{
    //     console.log(result);
    // });
    eos = Eos(config);
    //eos.getCurrencyBalance({ code: "eosio.token", account: "chen12312312" }).then(result => console.log(result))
    //转账
    $('#sub_acc_transfer').click(function(){
        var acc_t_num=$('#acc_t_num').val();
        var acc_t_name=$('#acc_t_name').val();
        var t_type=$('#t_type').attr('t-type');
        if($.trim(acc_t_name)==''){
            layer.msg('账号不能为空');
            //alert('账号不能为空');
            return;
        }
        if($.trim(acc_t_num)==''){
            layer.msg('数量不能为空');
            return;
        }

        //补位0 ---start
        if(acc_t_num.indexOf('.')>0){
            var accNumLen=acc_t_num.substr(acc_t_num.indexOf('.')+1).length;
        }else{
            acc_t_num+='.';
            var accNumLen=0;
        }


        if(t_type=='EOS'){
            if(accNumLen<4){
                acc_t_num=acc_t_num.padEnd((acc_t_num.length+(4-accNumLen)),0);
            }
        }else{
            if(accNumLen<8){
                acc_t_num=acc_t_num.padEnd((acc_t_num.length+(8-accNumLen)),0);
            }
        }
        //补位0 ---end

        layer.prompt({title: '请输入账户私钥', formType: 1},function(val, index){
            //layer.msg('得到了'+val);
            if(t_type=='A'){
                var contractName=Contract_Name;
                var data={
                    _from: user_acc,
                    _to:acc_t_name,
                    _quantity:acc_t_num+' '+t_type,
                    _note:new Date().getTime()
                }
            }else{
                var contractName='eosio.token';
                var data={
                    from: user_acc,
                    to:acc_t_name,
                    quantity:acc_t_num+' '+t_type,
                    memo:new Date().getTime()
                }
            }

            var actionName='transfer';
            var authorization={actor:user_acc,permission: 'active'}

            Eos_transaction(contractName,actionName,authorization,data,val);
            layer.close(index);
        });
    });

    //弹层关闭按钮
    $('.bottom-hint-addr').click(function(){
        $('.footer_pop').addClass('hide');
    });
});
