var req=require("request");require("colors");
var loffset = 1/1.0231,boffset = 0.1385, btcusd=0, btccny=0, busdcny=0,ltcusd=0, ltccny=0, lusdcny=0;




var calc = ()=>{
    
    if(btcusd&&btccny){
        busdcny = btccny/btcusd; 
        console.log("BTC X/R Implied "+busdcny.toFixed(4).yellow);// + " - " + boffset.toFixed(4).blue+" = "+(busdcny-boffset).toFixed(4));
    }
    
    if(ltcusd&&ltccny){
        lusdcny = ltccny/ltcusd; 
        console.log("LTC X/R Implied "+lusdcny.toFixed(4).yellow);//+ " * " + loffset.toFixed(4).blue+" = "+(lusdcny*loffset).toFixed(4));
    }
}

setInterval(function(){
    calc();

    req({url:'https://btc-e.com/api/3/ticker/btc_usd/',timeout:1000}, 
        function(error, response, body){
            if(body){
                ticker = JSON.parse(body).btc_usd;
                btcusd = (ticker.buy+ticker.sell)/2;
            }
        }
    );

    req({url:'http://api.huobi.com/staticmarket/depth_btc_1.js',timeout:1000}, 
        function(error, response, body){
            if(body){
                ticker = JSON.parse(body);
                btccny = ((ticker.asks[0][0]+ticker.bids[0][0])/2);
            }
        }
    );

    //LTC

    req({url:'https://btc-e.com/api/3/ticker/ltc_usd/',timeout:1000}, 
        function(error, response, body){
            if(body){
                ticker = JSON.parse(body).ltc_usd;
                ltcusd = (ticker.buy+ticker.sell)/2;
            }
        }
    );

    req({url:'http://api.huobi.com/staticmarket/depth_ltc_1.js',timeout:1000}, 
        function(error, response, body){
            if(body){
                ticker = JSON.parse(body);
                ltccny = ((ticker.asks[0][0]+ticker.bids[0][0])/2);
            }
        }
    );

    

},1000);