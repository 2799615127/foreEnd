import { createRouter,createWebHashHistory} from 'vue-router'
import accountLogin from '../components/account/accountLogin.vue'
import accountLogon from '../components/account/accountLogon.vue'
import userLogWrite from "../components/userLog/userLogWrite.vue";
import jqy from "../components/tool/jqueryJS.js";
import userLog from "../components/userLog/userLog.vue";
import userlogDiary from "../components/userLog/userlogDiary.vue";

/***
 *
 * 前端路由，配置全局导航守卫
 *
 *
 * */
// 定义路由
// 每个路由都需要映射到一个组件。
const routes = [
    { path: '/accountlogon', component: accountLogon },
    { path: '/accountlogin', component: accountLogin },
    {path:'/userLogWrite',component:userLogWrite},
    {path:'/home',component:userLog},
    {path: '/userlogDiary',component: userlogDiary}

]

// 3. 创建路由实例并传递 `routes` 配置
const router = createRouter({
    // history 模式
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

//前守卫执行验证
router.beforeEach((to,from,next)=>{
    // next()
    //查看是否有token令牌
    if (!localStorage.getItem('token')) {
        //登录和注册界面不被跳转
        if (to.path === '/accountLogin'||to.path === '/accountLogon') {
            next()
        }else {
            router.push('/accountLogin')
        }
    } else {
        //跳转到主页
        if(to.path == '/'){
            router.push('/home')
        }else{
            //如果不是相对应的路由，跳转到登录界面。使用正则表达式判断
            if("/accountLogin"!=to.path){
                let isRouter=true;
                for(let i=0;i<routes.length;i++){
                    //全部转换为大写，进行验证
                    let r=routes[i].path.toUpperCase();
                    let reg=new RegExp(r+"/?$","i");
                    let isPath=to.path.toUpperCase().search(reg);
                    if(isPath==0&&isPath!=-1){
                        isRouter=false;
                        i=routes.length;
                    }
                }
                if(isRouter){
                    router.push('/accountLogin')
                }
            }

        }
        next()
    }

})

//后守卫执行组件对应ui界面
router.afterEach((to, from, failure) => {
    //全部转换为大写，进行验证
    let fullPath= to.path.toUpperCase();
   //这里可以向上面写for循环，但没写
   var userLogWrite=fullPath.search(/\/userLogWrite\/?$/i);
    var home=fullPath.search(/\/(home|userlogDiary)\/?$/i);
    if(userLogWrite!=-1&&userLogWrite==0){
        jqy(2)
    }else if(home!=-1&&home==0){
        jqy(3)
    }else{
        jqy(1)
    }
})


export  default router;