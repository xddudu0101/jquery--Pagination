$.fn.extend({
    "pagination":function(form){
	    var $this=this;
	    //定义分页结构体
	    var pageinfo={
             url:$("#"+form).attr("action"),  //获取Action路劲
             currentPage : $(this).attr("currentPage")*1, // 当前页码
             pageCount : $(this).attr("pageCount")*1, // 总页码
             total : $(this).attr("total")*1 // 总条数
	    };
	     
	    if(pageinfo.pageCount<2){
	        return false;      //如果小于2页，不显示分页插件
	    }
	    //初始化起始页数、结束页数
	    var start=2,end=6;
	    if(pageinfo.currentPage>3) {
	        start=pageinfo.currentPage-2;   //当前页大于3，开始页等于当前页减2，因为只显示前后2页和上一页，下一页
	    }       
	 
        if(pageinfo.pageCount>pageinfo.currentPage+2){   //当前页大于当前页+2，最后页等于当前页+2，因为只显示前后2页和上一页，下一页
        	end=pageinfo.currentPage+2;
        } else{
            end=pageinfo.pageCount;
        }
	    var html=[];     //定义数组
	    html.push("<ul id='paginationBar'>");    //用UL的布局填充数据
	    if(pageinfo.currentPage!=1){              //第一步先渲染上一页或者  上一页+第一页
	    	//如果不是第一页则有前一页
	        html.push("<li class='page_prev'><a>上一页</a></li>");
	        html.push("<li class='nomal'><a >1</a></li>");
	    } else{
	    	html.push("<li class='active'><a >1</a></li>");
	    }
	        
	    for(var i=start;i<=end;i++){       //将分页所有的页数渲染出来
	        if(i==pageinfo.currentPage){    //给当前页添加选中的样式
	            html.push("<li class='active'><a>"+i+"</a></li>");
	        	
	        } else{
	            html.push("<li class='nomal'><a >"+i+"</a></li>");
	        }
	    }
	     
	    if(pageinfo.pageCount>3&&pageinfo.currentPage<pageinfo.pageCount-2){
	        html.push("<li class='nomal'><a>"+pageinfo.pageCount+"</a></li>");
	    }
	    if(pageinfo.currentPage!=pageinfo.pageCount){
	        html.push("<li class='page_next'><a>下一页</a></li>");
	    }
	    html.push("</ul>");
	    html.push("<span class='page-total'>当前"+ pageinfo.currentPage +"/"+pageinfo.pageCount+"页，共"+ pageinfo.total +"条<span>");
	     
	     
	    $this.html(html.join("")); 
	    
	    //点击分页的数字绑定数据处理函数
	    $this.find(".nomal a").bind("click",function(){
	    	loading('请稍等...');
	    	$('#paginationBar').find('.active').removeClass('active');
	    	$(this).closest('.nomal').addClass('active');
	    	
	        redirectTo($(this).html());  //获取分页的数字（$(this).html()=1）执行跳转
	    });
	    
	    $this.find(".page_prev a").bind("click",function(){
	                  redirectTo(pageinfo.currentPage-1);
	    });
	    
	    $this.find(".page_next a").bind("click",function(){
	         redirectTo(pageinfo.currentPage+1);
	    });
	     
	    function redirectTo(page){
            var url = pageinfo.url;    //获取form中action的url
            if(url.indexOf("?")==-1){  //如果不带？参数，则添加？
                url += "?";
            }
            else{
                url += "&";    //如果带？参数，则添加&
            }
            url += "page="+page;
            $("form[id='"+form+"']").attr("action",url);  //$("form[id='"+form+"']")=$("#"+form)
            $("#"+form).submit();  //点击数字就类似于form提交submit的功能
	    }
	    return $this;
    }
});




 <script type="text/javascript">
    $(document).ready(function() {
    	closeLoading(); //页面加载后关闭loading层
		$(".pagination").pagination("searchForm"); //执行分页插件
	});
 </script>	
	
