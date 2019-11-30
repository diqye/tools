function start(){
    let lastNotices = []
    Notification.requestPermission(flag=>flag=="granted"?start0():void null)
    function start0(){
        new Notification('第七页的B站直播',{body:'开始弹幕采集和提示'})
        collection(document.querySelector('#chat-history-list'),notice=>{
            new Notification(notice.title,notice)
        })
    }
    // 3秒收集一次
    // 对比最近20条弹幕，差异作为提示
    function collection(root,callback){
            console.log('collection', lastNotices)
        let chats = Array.prototype.slice.call(root.querySelectorAll('.chat-item')).slice(-20);
        let notices = chats.map(a=>a.textContent)
                           .map(a=>a.split('\n').pop())
                           .map(a=>a.split(':'))
                           .map(([a,b])=>({title:a,body:b}))
       if(lastNotices.length==0){
           lastNotices = notices
           setTimeout(()=>collection(root,callback),3000)
       }else{
           let lastChat = lastNotices[lastNotices.length - 1]
           for(let i=notices.length-1;i>-1;i--){
               let notice = notices[i]
               if(JSON.stringify(notice) == JSON.stringify(lastChat)){
                   break
               }else{
                   callback(notice)
               }
           }
           lastNotices = notices
           setTimeout(()=>collection(root,callback),2000)
       }                    
       
     }
    
}
start()
