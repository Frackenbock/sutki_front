function normalizeVspDataRecords(data){
    const normArr=[];
    let promejutPeremen=data[0].date
    for(let i=0;i<data.length;i++){
        let flagnewDate=false;
        if(promejutPeremen!==data[i].date){
            promejutPeremen=data[i].date
            flagnewDate=true;
        }
        normArr.push({id:data[i].id,  
            prolet:data[i].prolet, 
            typeOpen:data[i].type_open, 
            openDate:data[i].date,
            openTimeHours:(data[i].open_time).slice(0,2), 
            openTimeMinutes:(data[i].open_time).slice(3,5),
            closeTimeHours:(data[i].close_time).slice(0,2), 
            closeTimeMinutes:(data[i].close_time).slice(3,5),
            workTime:data[i].time_work,
            ubv:data[i].ubv, 
            rashodM:data[i].rashod_mgn, 
            stok:data[i].stok, 
            rashodS:data[i].rashod_srd,
            flagnewDate
        });
            
    }

    return normArr
}

export default normalizeVspDataRecords;
