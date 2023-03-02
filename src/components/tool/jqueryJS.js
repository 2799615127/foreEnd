/***
 * 使用jQuery对界面进行更改
 * @param index
 */
const jqy=(index)=>{
    if(index=='1'){
        $("body").attr('class','xiaoming_back_ground');
        $(".backstretch").remove();
        $("#xiaoming_header h1").text("周志明的个人博客");
        $("body").backstretch("/images/music-bg.png");
        $("#account").attr('style','display:inline');
        $("#blog").attr('style','display:inline');
    }else if(index=='2'){
        $("#account").attr('style','display:inline');
        $("#blog").attr('style','display:inline');
        $("body").attr('class','xiaoming_no');
        $(".backstretch").remove();
        $("body").backstretch("/images/3.jpeg");
        $("#xiaoming_header h1").text("个人日记");
    }else if(index=='3'){
        let css='display:inline;' +
            'top:0;' +
            'right:0;' +
            'background-repeat:no-repeat;' +
            'background-position:center center;'
        $("#blog").attr('style',css);
        $("body").attr('class','xiaoming_no');
        $(".backstretch").remove();
        $("body").backstretch("/images/4.jpeg");
        $("#xiaoming_header h1").text("个人主页");
    }
}
export default jqy