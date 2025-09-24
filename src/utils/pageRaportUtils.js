function createUdgArrRaport(data){
    let udgArr = [];
    udgArr.push([Number(data[0][2]).toFixed(2),data[0][0]])
    for(let i=1;i<data.length;i++){
        udgArr.push([((Number(data[i][2])+Number(data[i-1][2]))/2).toFixed(2), data[i][0] ])
    }
     return udgArr
}

function createOtklUdgFactArrRaport(udg,virab){
    let otklon=[]
    for(let i=0;i<25;i++){
        otklon.push ( (Number(virab[i][0])/1000 - Number(udg[i][0])).toFixed(3)   )
    }
    return otklon
}

function createRenderTableData(uvbRaportData,naprRaportData,unbRaportData,naporsRaport,raportUDGArr,raportPbrArr,raportAIISArr,otklonRAportData,dataTodayNapors){
    return[
        {chas:'06:00', numb:'p1', idUVB:1, idUNB:26, uvb:uvbRaportData.p1, naprjag:naprRaportData.p1, unb:unbRaportData.p1, napor:naporsRaport[0][1], 
            udg:raportUDGArr[0][0], pbr:raportPbrArr[0][2], aiiskue:raportAIISArr[0][0], otklon:otklonRAportData[0]},
        {chas:'07:00', numb:'p2', idUVB:2, idUNB:27, uvb:uvbRaportData.p2, naprjag:naprRaportData.p2, unb:unbRaportData.p2, napor:naporsRaport[1][1], 
            udg:raportUDGArr[1][0], pbr:raportPbrArr[1][2], aiiskue:raportAIISArr[1][0], otklon:otklonRAportData[1]},
        {chas:'08:00', numb:'p3', idUVB:3, idUNB:28, uvb:uvbRaportData.p3, naprjag:naprRaportData.p3, unb:unbRaportData.p3, napor:naporsRaport[2][1], 
            udg:raportUDGArr[2][0], pbr:raportPbrArr[2][2], aiiskue:raportAIISArr[2][0], otklon:otklonRAportData[2]},
        {chas:'09:00', numb:'p4', idUVB:4, idUNB:29, uvb:uvbRaportData.p4, naprjag:naprRaportData.p4, unb:unbRaportData.p4, napor:naporsRaport[3][1], 
            udg:raportUDGArr[3][0], pbr:raportPbrArr[3][2], aiiskue:raportAIISArr[3][0], otklon:otklonRAportData[3]},
        {chas:'10:00', numb:'p5', idUVB:5, idUNB:30, uvb:uvbRaportData.p5, naprjag:naprRaportData.p5, unb:unbRaportData.p5, napor:naporsRaport[4][1], 
            udg:raportUDGArr[4][0], pbr:raportPbrArr[4][2], aiiskue:raportAIISArr[4][0], otklon:otklonRAportData[4]},
        {chas:'11:00', numb:'p6', idUVB:6, idUNB:31, uvb:uvbRaportData.p6, naprjag:naprRaportData.p6, unb:unbRaportData.p6, napor:naporsRaport[5][1], 
            udg:raportUDGArr[5][0], pbr:raportPbrArr[5][2], aiiskue:raportAIISArr[5][0], otklon:otklonRAportData[5]},
        {chas:'12:00', numb:'p7', idUVB:7, idUNB:32, uvb:uvbRaportData.p7, naprjag:naprRaportData.p7, unb:unbRaportData.p7, napor:naporsRaport[6][1], 
            udg:raportUDGArr[6][0], pbr:raportPbrArr[6][2], aiiskue:raportAIISArr[6][0], otklon:otklonRAportData[6]},
        {chas:'13:00', numb:'p8', idUVB:8, idUNB:33, uvb:uvbRaportData.p8, naprjag:naprRaportData.p8, unb:unbRaportData.p8, napor:naporsRaport[7][1], 
            udg:raportUDGArr[7][0], pbr:raportPbrArr[7][2], aiiskue:raportAIISArr[7][0], otklon:otklonRAportData[7]},
        {chas:'14:00', numb:'p9', idUVB:9, idUNB:34, uvb:uvbRaportData.p9, naprjag:naprRaportData.p9, unb:unbRaportData.p9, napor:naporsRaport[8][1], 
            udg:raportUDGArr[8][0], pbr:raportPbrArr[8][2], aiiskue:raportAIISArr[8][0], otklon:otklonRAportData[8]},
        {chas:'15:00', numb:'p10', idUVB:10, idUNB:35, uvb:uvbRaportData.p10, naprjag:naprRaportData.p10, unb:unbRaportData.p10, napor:naporsRaport[9][1], 
            udg:raportUDGArr[9][0], pbr:raportPbrArr[9][2], aiiskue:raportAIISArr[9][0], otklon:otklonRAportData[9]},
        {chas:'16:00', numb:'p11', idUVB:11, idUNB:36, uvb:uvbRaportData.p11, naprjag:naprRaportData.p11, unb:unbRaportData.p11, napor:naporsRaport[10][1], 
            udg:raportUDGArr[10][0], pbr:raportPbrArr[10][2], aiiskue:raportAIISArr[10][0], otklon:otklonRAportData[10]},
        {chas:'17:00', numb:'p12', idUVB:12, idUNB:37, uvb:uvbRaportData.p12, naprjag:naprRaportData.p12, unb:unbRaportData.p12, napor:naporsRaport[11][1], 
            udg:raportUDGArr[11][0], pbr:raportPbrArr[11][2], aiiskue:raportAIISArr[11][0], otklon:otklonRAportData[11]},
        {chas:'18:00', numb:'p13', idUVB:13, idUNB:38, uvb:uvbRaportData.p13, naprjag:naprRaportData.p13, unb:unbRaportData.p13, napor:naporsRaport[12][1], 
            udg:raportUDGArr[12][0], pbr:raportPbrArr[12][2], aiiskue:raportAIISArr[12][0], otklon:otklonRAportData[12]},
        {chas:'19:00', numb:'p14', idUVB:14, idUNB:39, uvb:uvbRaportData.p14, naprjag:naprRaportData.p14, unb:unbRaportData.p14, napor:naporsRaport[13][1], 
            udg:raportUDGArr[13][0], pbr:raportPbrArr[13][2], aiiskue:raportAIISArr[13][0], otklon:otklonRAportData[13]},
        {chas:'20:00', numb:'p15', idUVB:15, idUNB:40, uvb:uvbRaportData.p15, naprjag:naprRaportData.p15, unb:unbRaportData.p15, napor:naporsRaport[14][1], 
            udg:raportUDGArr[14][0], pbr:raportPbrArr[14][2], aiiskue:raportAIISArr[14][0], otklon:otklonRAportData[14]},
        {chas:'21:00', numb:'p16', idUVB:16, idUNB:41, uvb:uvbRaportData.p16, naprjag:naprRaportData.p16, unb:unbRaportData.p16, napor:naporsRaport[15][1], 
            udg:raportUDGArr[15][0], pbr:raportPbrArr[15][2], aiiskue:raportAIISArr[15][0], otklon:otklonRAportData[15]},
        {chas:'22:00', numb:'p17', idUVB:17, idUNB:42, uvb:uvbRaportData.p17, naprjag:naprRaportData.p17, unb:unbRaportData.p17, napor:naporsRaport[16][1], 
            udg:raportUDGArr[16][0], pbr:raportPbrArr[16][2], aiiskue:raportAIISArr[16][0], otklon:otklonRAportData[16]},
        {chas:'23:00', numb:'p18', idUVB:18, idUNB:43, uvb:uvbRaportData.p18, naprjag:naprRaportData.p18, unb:unbRaportData.p18, napor:naporsRaport[17][1], 
            udg:raportUDGArr[17][0], pbr:raportPbrArr[17][2], aiiskue:raportAIISArr[17][0], otklon:otklonRAportData[17]},
        {chas:'24:00', numb:'p19', idUVB:19, idUNB:44, uvb:uvbRaportData.p19, naprjag:naprRaportData.p19, unb:unbRaportData.p19, napor:naporsRaport[18][1], 
            udg:raportUDGArr[18][0], pbr:raportPbrArr[18][2], aiiskue:raportAIISArr[18][0], otklon:otklonRAportData[18]},
        {chas:'01:00', numb:'p20', idUVB:20, idUNB:45, uvb:uvbRaportData.p20, naprjag:naprRaportData.p20, unb:unbRaportData.p20, napor:naporsRaport[19][1], 
            udg:raportUDGArr[19][0], pbr:raportPbrArr[19][2], aiiskue:raportAIISArr[19][0], otklon:otklonRAportData[19], idNAP:51, todayNapor:dataTodayNapors.p20},
        {chas:'02:00', numb:'p21', idUVB:21, idUNB:46, uvb:uvbRaportData.p21, naprjag:naprRaportData.p21, unb:unbRaportData.p21, napor:naporsRaport[20][1], 
            udg:raportUDGArr[20][0], pbr:raportPbrArr[20][2], aiiskue:raportAIISArr[20][0], otklon:otklonRAportData[20], idNAP:52, todayNapor:dataTodayNapors.p21},
        {chas:'03:00', numb:'p22', idUVB:22, idUNB:47, uvb:uvbRaportData.p22, naprjag:naprRaportData.p22, unb:unbRaportData.p22, napor:naporsRaport[21][1], 
            udg:raportUDGArr[21][0], pbr:raportPbrArr[21][2], aiiskue:raportAIISArr[21][0], otklon:otklonRAportData[21], idNAP:53, todayNapor:dataTodayNapors.p22},
        {chas:'04:00', numb:'p23', idUVB:23, idUNB:48, uvb:uvbRaportData.p23, naprjag:naprRaportData.p23, unb:unbRaportData.p23, napor:naporsRaport[22][1], 
            udg:raportUDGArr[22][0], pbr:raportPbrArr[22][2], aiiskue:raportAIISArr[22][0], otklon:otklonRAportData[22], idNAP:54, todayNapor:dataTodayNapors.p23},
        {chas:'05:00', numb:'p24', idUVB:24, idUNB:49, uvb:uvbRaportData.p24, naprjag:naprRaportData.p24, unb:unbRaportData.p24, napor:naporsRaport[23][1], 
            udg:raportUDGArr[23][0], pbr:raportPbrArr[23][2], aiiskue:raportAIISArr[23][0], otklon:otklonRAportData[23], idNAP:55, todayNapor:dataTodayNapors.p24},
        {chas:'06:00', numb:'p25', idUVB:25, idUNB:50, uvb:uvbRaportData.p25, naprjag:naprRaportData.p25, unb:unbRaportData.p25, napor:naporsRaport[24][1], 
            udg:raportUDGArr[24][0], pbr:raportPbrArr[24][2], aiiskue:raportAIISArr[24][0], otklon:otklonRAportData[24], idNAP:56, todayNapor:dataTodayNapors.p25},
    ]
}

export  {createUdgArrRaport, createOtklUdgFactArrRaport, createRenderTableData};