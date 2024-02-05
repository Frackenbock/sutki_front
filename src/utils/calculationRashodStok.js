import fetchSutki from "../API/fetchSutki";
const P_min=[10,15,10,10,10,10,10,10];
const P_max=[70,75,70,70,70,70,70,70];

function calculationRashodStok(arrNapor,arrTime,arrPower){
/////////////////////////////////////////////////////////////////////
let arrRashod = [];
for(let j=0;j<=23;j++){
    let strRashod=[]
    for (let i = 1;i<=8;i++){
        arrNapor[j].input=(arrNapor[j].input).replace(',','.');
            if(arrNapor[j].input!==''){//если напор не пустая строка - продолжаем
                if(Number((arrTime[j]['gen'+i]).replace(',','.'))!==0){//если время не пустая строка или не равно 0 - продолжаем
                     if(Number((arrTime[j]['gen'+i]).replace(',','.'))<=60){//если время меньше или равно 60 - продолжаем
                        if(Number((arrPower[j]['gen'+i]).replace(',','.'))!==0){//если выработка не пустая строка или не равно 0 - продолжаем
                            let power = ((Number((arrPower[j]['gen'+i]).replace(',','.'))/1000*60))/Number(arrTime[j]['gen'+i]);
                            if (power>P_max[i-1]){power=P_max[i-1]}//если выработка больше крайнего значения, она приравнивается крайнему значению
                            if(power>P_min[i-1]){
                            rashod(j,i,arrNapor[j].input,power,Number((arrPower[j]['gen'+i]).replace(',','.')))
                            .then((data)=>{
                                    data = data*Number(arrTime[j]['gen'+i])/60
                                    strRashod.push({number:i,data:Math.round(data)}) 
                            })
                            }else{
                                return `Для генератора ${i} выработка за ${j+1}-й час не входит в диапазон для расчёта расхода.`}
                        }else{//если выработка за час равна 0, расход за час на генераторе = 0
                            strRashod.push({number:i,data:'0'})}
                     }else{
                        return `Количество минут работы генератора ${i} за ${j+1}-й час больше 60. Повторите ввод.` } 
                }else{//если время пустая строка или равно 0, расход за час на генераторе = 0
                    strRashod.push({number:i,data:'0'})}            
            }else{//если напор пустая строка, расход за час на генераторах = 0
                return `Не введён напор за ${arrNapor[j].number}-й час суток, либо после его ввода не был нажат Enter. Повторите ввод.`}
    }
    arrRashod.push(strRashod);
}
return arrRashod
}

async function rashod(hour,genNum,napor,genPowerHour){
    let N1,N2  //Дополнительные напоры и мощности, по которым делается запрос в БД за расходами в данных точках,  
    let P1,P2  //для последующего расчёта интерполяции
    let R11,R12,R21,R22,R;
    let F11,F12,F21,F22;
    const sutkiApi = new fetchSutki();
    
    N1 = Math.trunc(Number(napor)*10)/10;
    if(Number(napor)===N1){
        N2=Number(N1);
    }else{
        N2=Number((N1+0.1).toFixed(1));
    };
    if(N2>17.5){N2=17.5};

    P1 = Math.trunc(Number(genPowerHour));
    // console.log(P1)
    if(P1===genPowerHour){
        P2=P1;
    }else{
        P2=P1+1;
    };
    if(P2 > P_max[genNum-1]){
        P2 = P_max[genNum-1];
    };

    //в БД у чисел дробная часть отделена запятой
    //если отправить в запросе число с точкой неичего не будет найдено
    N1=String(N1).replace('.',',');
    N2=String(N2).replace('.',',');

    const dataForFetch={
        P1,P2,N1,N2,genNum,
    };
     let k= sutkiApi.getDataRashod(dataForFetch)
    .then((data)=>{
        let a=0,b=0,c=0,d=0;
        //из БД иногда приходят некорректные значения напоров формата: 15.3000000000001
        //для того чтобы это отсечь, необходимы блоки if ниже   
        if ((data[0][1] - Math.trunc(data[0][1]))>0){
                a = String((data[0][1]).toFixed(1)).replace('.',',');
        }else{a = String(data[0][1])}
        if(typeof(data[1])!=='undefined'){//если попали в точку, придёт один массив
            if ((data[1][1] - Math.trunc(data[1][1]))>0){
                b = String((data[1][1]).toFixed(1)).replace('.',',');
            }else{b = String(data[1][1])}
        }
        if(typeof(data[2])!=='undefined'){//если напоры N1 и N2 равны или равны мощности то приходит 2 массива а не 4
            if ((data[2][1] - Math.trunc(data[2][1]))>0){
                c = String((data[2][1]).toFixed(1)).replace('.',',');
            }else{c = String(data[2][1])}
        }

        if(typeof(data[3])!=='undefined'){//если напоры N1 и N2 равны или равны мощности то приходит 2 массива а не 4
            if ((data[3][1] - Math.trunc(data[3][1]))>0){
                d = String((data[3][1]).toFixed(1)).replace('.',',');
            }else{d = String(data[3][1])}
        }
        
        //////////////////////////////////////////////////////////////////
        if(typeof(data[1])!=='undefined'&&typeof(data[2])==='undefined'&&typeof(data[3])==='undefined'&&N1===N2){
            if (P1===data[0][0] && N1===a){R11=data[0][2];}; 
            if (P2===data[1][0] && N2===b){R21=data[1][2];}; 
            R12=0;
            R22=0;
        }else if(typeof(data[1])!=='undefined'&typeof(data[2])==='undefined'&&typeof(data[3])==='undefined'&&data[0][0]===data[1][0]){
            if (P1===data[0][0] && N1===a){R11=data[0][2];}; 
            if (P2===data[1][0] && N2===b){R12=data[1][2];}; 
            R21=0;
            R22=0;
        } else  if(typeof(data[1])==='undefined'&&typeof(data[2])==='undefined'&&typeof(data[3])==='undefined'){
            R11=data[0][2]; 
            R12=0;
            R21=0;
            R22=0;
        } else{
            if (P1===data[0][0] && N1===a){R11=data[0][2];}; 
            if (P1===data[1][0] && N2===b){R12=data[1][2];}; 
            if (P2===data[2][0] && N1===c){R21=data[2][2];}; 
            if (P2===data[3][0] && N2===d){R22=data[3][2];};
        }
        N1=Number((N1).replace(',','.'));
        N2=Number((N2).replace(',','.'));

        if(R11!==0 && R12===0 && R21===0 && R22===0){
            R=R11;
            //  console.log(R,1)
        } else if(R11!==0 && R12!==0 && R21===0 && R22===0){//мощность одинаковая
            F11 = R11*(N2-Number(napor))/(N2-N1);
            F12 = R12*(Number(napor)-N1)/(N2-N1);
            R=F11+F12;
            //  console.log(R,2)
        } else if(R11!==0 && R12===0 && R21!==0 && R22===0){//напоры одинаковые
            F11 = R11*(P2-genPowerHour)/(P2-P1);
            F21 = R21*(genPowerHour-P1)/(P2-P1);
            R=F11+F21;
            //  console.log(R,3)
        } else if(R11!==0 && R12!==0 && R21===0 && R22!==0){
            F11 = R11*(N2-Number(napor))*(P2-genPowerHour)/(N2-N1)/(P2-P1);
            F12 = R12*(Number(napor)-N1)*(P2-genPowerHour)/(N2-N1)/(P2-P1);
            F21 = (R11+(R22 - R12))*(N2-Number(napor))*(genPowerHour-P1)/(N2-N1)/(P2-P1);
            F22 = R22*(Number(napor)-N1)*(genPowerHour-P1)/(N2-N1)/(P2-P1);
            R=F11+F12+F21+F22;
            //  console.log(R,4)
        } else if(R11!==0 && R12!==0 && R21!==0 && R22!==0){
            F11 = R11*(N2-Number(napor))*(P2-genPowerHour)/(N2-N1)/(P2-P1);
            F12 = R12*(Number(napor)-N1)*(P2-genPowerHour)/(N2-N1)/(P2-P1);
            F21 = R21*(N2-Number(napor))*(genPowerHour-P1)/(N2-N1)/(P2-P1);
            F22 = R22*(Number(napor)-N1)*(genPowerHour-P1)/(N2-N1)/(P2-P1);
            R=F11+F12+F21+F22;
            //  console.log(R,5)
        } else{
            console.log('Ошибка в рачёте')
        }  

        return Promise.resolve(R)
    });
    return k;
};
export default calculationRashodStok;