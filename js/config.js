var eos = {};
var permissions;
var user_acc='';
const Contract_Name='owner1111114';
const transactionInfoLink='https://jungle.bloks.io/transaction/';
var config = {
    httpEndpoint: 'http://jungle.cryptolions.io:18888', //DEV开发链url与端口
    chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca', // 通过cleos get info可以获取chainId
    keyProvider:'',//配置私钥字符串
    verbose: false,

    mockTransactions: () => null, // 如果要广播，需要设为null
    // transactionHeaders: (expireInSeconds, callback) => {
    //     callback(null/*error*/, headers) //手动设置交易记录头，该方法中的callback回调函数每次交易都会被调用
    // },
    expireInSeconds: 60,
    broadcast: true,
    debug: false,
    sign: true,

    //authorization: null // 该参数用于在多签名情况下，识别签名帐号与权限,格式如：account@permission
}
// var config ={
//     httpEndpoint: 'http://jungle.cryptolions.io:18888',
//     chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
//     // httpEndpoint: 'http://10.0.0.6:8888',
//     // chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
//     keyProvider: '5Hqg51v9W84GeGNzupB7RmdjFM16PA5ajkbLaJFyaaF2MTuVLB7',
//     verbose: true
// }