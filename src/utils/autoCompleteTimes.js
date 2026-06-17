function autoCompleteTimes(powers,times){
    let data = [];
    if(powers[0].gen1==='-'){//если нажали выгрузить время до выгрузки мощности
        for (let i=0;i<=23;i++){
            let str={};
            for(let j=1;j<=8;j++){
                    str['gen'+j]='0'
            };
            data.push(str);
        };
    };
    if(times.length===0){//если в БД ещё не было записано время,мощность выгружена 
        for (let i=0;i<=23;i++){
            let str={};
            for(let j=1;j<=8;j++){
                if (powers[i]['gen'+j]==='0,00'||powers[i]['gen'+j]===''){
                    str['gen'+j]='0'
                }else if(powers[i]['gen'+j]==='нет данных'){
                    str['gen'+j]='-'
                }else{
                    str['gen'+j]='60'
                };
            };
            data.push(str);
        };
    }else{//если в БД записано время, мощность выгружена  
        for (let i=0;i<=23;i++){
            let str={};
            for(let j=1;j<=8;j++){
                if(times[i]['g'+j]===0 && powers[i]['gen'+j]!=='0,00'){
                    str['gen'+j]='60'
                }else{
                    str['gen'+j]=String(times[i]['g'+j])
                }; 
            };
            data.push(str);
        };
    };
    return data;
};

export default autoCompleteTimes;