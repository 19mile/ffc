window.onload=()=>{
    const qp = document.getElementById("game");
    const ctx = qp.getContext("2d");
    let hX = 35;
    let hY = 35;
    let nowP = 0;
    const arr = new Array(15);

    const hzqp = (() => {
        hX=35;
        hY=35;
        for(let i=0;i<15;i++){
            ctx.beginPath();
            ctx.moveTo(hX,hY);
            ctx.lineTo(hX+280,hY)
            ctx.closePath()
            ctx.stroke();
            hY+=20;
        }
        hX=35,hY=35;
        for(let i=0;i<15;i++){
            ctx.beginPath();
            ctx.moveTo(hX,hY);
            ctx.lineTo(hX,hY+280)
            ctx.closePath()
            ctx.stroke();
            hX+=20;
        }    
    })
    
    const hqz = (col,x,y) => {
        ctx.fillStyle = col===1?"#000000":"#ffffff";
        ctx.beginPath();
        ctx.arc(x,y,8,0,Math.PI*2,true);
        ctx.fill();
    }//填充单个棋子


    //计算点击处的位置
    const jsXy = (x0,y0) => {
        return {x:Math.round((x0-30)/20),y:Math.round((y0-30)/20)}
    }
    //文字说明区域
    const tcText = ()=>{
        ctx.fillStyle = "orange";
        ctx.fillRect(50,350,200,100);
        ctx.fillStyle = "#000000";
        ctx.font = "24px serif";
        ctx.fillText(`该${nowP===0?'白':"黑"}棋走`, 50, 400);
    };
    
    //判断输赢
    const pdsy = (x,y) => {
        //横向
        let sm = 1;
        for(let i=1;i<=4;i++){
            if(x-i>=0&&arr[x-i][y]===nowP) sm++;
            else break;

        }
        for(let i=1;i<=4;i++){
            if(x+i<=14&&arr[x+i][y]===nowP) sm++;
            else break;
        }
        if(sm>=5){
            alert(`${nowP===0?'白':"黑"}胜利`);
            nowP=1;
            startGame();
            return;
        }
        //纵向
        sm=1;
        for(let i=1;i<=4;i++){
            if(y-i>=0&&arr[x][y-i]===nowP) sm++;
            else break;

        }
        for(let i=1;i<=4;i++){
            if(y+i<=14&&arr[x][y+i]===nowP) sm++;
            else break;
        }
        if(sm>=5){
            alert(`${nowP===0?'白':"黑"}胜利`);
            nowP=1;
            startGame();
            return;
        }
        //主对角线
        sm=1;
        for(let i=1;i<=4;i++){
            if(y-i>=0&&x-i>0&&arr[x-i][y-i]===nowP) sm++;
            else break;

        }
        for(let i=1;i<=4;i++){
            if(y+i<=14&&x+i<=14&&arr[x+i][y+i]===nowP) sm++;
            else break;
        }
        if(sm>=5){
            alert(`${nowP===0?'白':"黑"}胜利`);
            nowP=1;
            startGame();
            return;
        }
        //副对角线
        sm=1;
        for(let i=1;i<=4;i++){
            if(y-i>=0&&x+i<=14&&arr[x+i][y-i]===nowP) sm++;
            else break;

        }
        for(let i=1;i<=4;i++){
            if(y+i<=14&&x-i>=0&&arr[x-i][y+i]===nowP) sm++;
            else break;
        }
        if(sm>=5){
            alert(`${nowP===0?'白':"黑"}胜利`);
            nowP=1;
            startGame();
            return;
        }
        
    }

    qp.addEventListener("click",()=>{
        sj()
    });
    
    const sj = ()=>{
        let x = event.pageX - qp.getBoundingClientRect().left;
        let y = event.pageY - qp.getBoundingClientRect().top;
        if(x<30||x>320||y<30||y>320) return;//点到棋盘外无反应
        const zb = jsXy(x,y);
        if(arr[zb.x][zb.y]===1||arr[zb.x][zb.y]===0) return;
        arr[zb.x][zb.y] = nowP;
        hqz(nowP,35+zb.x*20,35+zb.y*20)
        setTimeout(()=>{
            pdsy(zb.x,zb.y);
            nowP = nowP===0?1:0;
            tcText();
        },10)
    }
    const startGame = ()=>{
        ctx.strokeRect(0,0,350,500);
        ctx.fillStyle = "orange";
        ctx.fillRect(0,0,350,500);
        hzqp();
        for(let i=0;i<15;i++){
            arr[i]=new Array(15);
            arr[i].fill(null);
        }
        tcText()
    }
    startGame()
};
