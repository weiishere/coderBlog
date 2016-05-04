<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage/GlobleMasterPage.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="web.SystemPage.Default" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title>社区-You.coder.com</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="subMenuPlace" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlace" runat="server">
    <div class="mainContent clearfix">
        
        <aside class="IndexSideBar" id="IndexSideBar">
            <input type="button" value="◤" class="toggleBar" id="toggleBar" title="隐藏(显示)侧边栏/信息栏"/>
            <ul id="sideBarMenu">
                <li order="Feed"><h2>动态</h2></li>
                <li order="Mine"><h2>我的</h2></li>
                <li order="Picture"><h2>图片</h2></li>
                <li order="'Group"><h2>扎堆</h2></li>
                <li order="User"><h2>会员</h2></li>
            </ul>
        </aside>
        <div class="contentOutWrap">
            <section class="siteInfoWrap" id="siteInfoWrap">
                <header><h1>&nbsp;公告：</h1></header>
                <div><a href="#">关于社区的人员邀请制度</a></div>
                <span class="fr">今日动态：22，访问次数：155&nbsp;</span>
            </section>
            <div class="contentWrap">
                <!--动态-->
                <section class="sectionContentWeap" style="margin-left:20px;display:block" id="sectionForFeed">
                    <header><h1>最新动态</h1></header>
                    <!--文章-->
                    <section>
                        <header>
                            <h1 class="hIconArticle"><a href="#">网页Javascript提交OutLook发送邮件</a></h1>
                            <time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>
                            <span>作者：<a href="#">黄小伟</a>&nbsp;&nbsp;<a href="#" title="查看详细" class="detailsLink"></a></span>
                            <div>栏目：<a href="#">javascript</a></div>
                        </header>
                        <div>
                            网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件
                        </div>
                        <footer>
                            <div><a href="#">阅读(0)</a><a href="#">评论(0)</a><a href="#">收藏(0)</a></div>
                        </footer>
                    </section>
                    <!--文章-->
                    <section>
                        <header>
                            <h1 class="hIconArticle"><a href="#">jquery常用功能归纳</a></h1>
                            <time datetime="2012-9-25T12:11:41">2012-9-25 12:11:41</time>
                            <span>作者：<a href="#">黄小伟</a>&nbsp;&nbsp;<a href="#" title="查看详细" class="detailsLink"></a></span>
                            <div>栏目：<a href="#">javascript</a></div>
                        </header>
                        <div>
                            jQuery的设计会改变你写JavaScript代码的方式，降低你学习使用JS操作网页的复杂度，提高网页JS开发效率，无论对于js初学者还是资深专家，jQuery都将是您的首选。jQuery适合于设计师、开发者以及那些还好者，同样适合用于商业开发，可以说jQuery适合任何JavaScript应用的地方，可用于不同的Web应用程序中
                        </div>
                        <footer>
                            <div><a href="#">阅读(0)</a><a href="#">评论(0)</a><a href="#">收藏(0)</a></div>
                        </footer>
                    </section>
                    <!--图片-->
                    <section>
                        <header>
                            <h1 class="hIconPic"><a href="#">海布里大帝.jpg</a></h1>
                            <time datetime="2012-9-25T12:11:41">2012-9-25 12:11:41</time>
                            <span>作者：<a href="#">黄小伟</a>&nbsp;&nbsp;<a href="#" title="查看详细" class="detailsLink"></a></span>
                            <div>相册：<a href="#">球星</a></div>
                        </header>
                        <div>
                            <figure class="IndexPiclist">
                                <img src="../Images/henry.jpg" />
                                <img src="../Images/henry.jpg" />
                                <img src="../Images/henry.jpg" />
                                <figcaption>
                                    海布里大帝就是帅气，海布里大帝就是帅气，海布里大帝就是帅气，海布里大帝就是帅气，海布里大帝就是帅气
                                </figcaption>
                            </figure>
                        </div>
                        <footer>
                            <div><a href="#">阅读(0)</a><a href="#">评论(0)</a><a href="#">收藏(0)</a></div>
                        </footer>
                    </section>
                    <!--签名-->
                    <section>
                        <header>
                            <h1 class="hIconSay"><a href="#">没有人会陪你走一辈子，所以你要适应孤独，没有人会帮你一辈子，所以你要奋...</a></h1>
                            <time datetime="2012-9-25T12:11:41">2012-9-25 12:11:41</time>
                            <span><a href="#" title="查看详细" class="detailsLink"></a></span>
                            <div>来自：<a href="#">黄晓伟</a></div>
                        </header>
                        <div>
                            没有人会陪你走一辈子，所以你要适应孤独，没有人会帮你一辈子，所以你要奋斗一生
                        </div>
                        <footer>
                            <div><a href="#">阅读(0)</a><a href="#">评论(0)</a><a href="#">收藏(0)</a></div>
                        </footer>
                    </section>
                    <!--音乐-->
                    <section>
                        <header>
                            <h1 class="hIconAudio"><a href="#">追梦赤子心-GALA</a></h1>
                            <time datetime="2012-9-25T12:11:41">2012-9-25 12:11:41</time>
                            <span><a href="#" title="查看详细" class="detailsLink"></a></span>
                            <div>来自：<a href="#">黄晓伟</a></div>
                        </header>
                        <div>
                            <embed src="http://www.xiami.com/widget/0_1770127756/singlePlayer.swf" type="application/x-shockwave-flash" width="257" height="33" wmode="transparent" >
                            <p>
                                充满鲜花的世界到底在哪里，如果它真的存在那么我一定会去，我想在那里最高的山峰矗立，不在乎它是不是悬崖峭壁
                            </p>
                        </div>
                        <footer>
                            <div><a href="#">阅读(0)</a><a href="#">评论(0)</a><a href="#">收藏(0)</a></div>
                        </footer>
                    </section>
                    <!--视频-->
                    <section>
                        <header>
                            <h1 class="hIconVedio"><a href="#">莫斯科机车手疯狂上班路，后面更刺激，足以血脉膨胀...</a></h1>
                            <time datetime="2012-9-25T12:11:41">2012-9-25 12:11:41</time>
                            <span><a href="#" title="查看详细" class="detailsLink"></a></span>
                            <div>来自：<a href="#">黄晓伟</a></div>
                        </header>
                        <div>
                            <figure class="pr">
                                <img class="vedioPic" src="http://g1.ykimg.com/1100641F464D8ADA3C158004CA3FD3BA68291E-98AA-B482-7DCC-9F2639647B76" />
                                <div class="vedioPlay" title="点击播放"></div>
                                <figcaption>莫斯科机车手疯狂上班路，后面更刺激，足以血脉膨胀...快的车手就是不怕死的人，看你心脏能撑多久，这位兄台估计身患绝症，临死前也要干一次大事！后半部分更BT</figcaption>
                            </figure>
                        </div>
                        <footer>
                            <div><a href="#">阅读(0)</a><a href="#">评论(0)</a><a href="#">收藏(0)</a></div>
                        </footer>
                    </section>
                </section>
                <!--我的-->
                <section class="sectionContentWeap" id="sectionForMine">
                    <header><h1>关于我</h1></header>
                    <section>
                        <header>
                            <h1 class="hIconSay"><q>文章：</q><a href="#">网页Javascript提交OutLook发送邮件</a><q>有了新评论</q></h1>
                            <time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>
                            <span>来自：<a href="#">王睿</a>&nbsp;&nbsp;<a href="#" title="查看详细" class="detailsLink"></a></span>
                            <div>栏目：<a href="#">javascript</a></div>
                        </header>
                        <div>
                            这篇文章写的很好！不错
                        </div>
                        <footer>
                            <div><a href="#">阅读(0)</a><a href="#">评论(0)</a></div>
                        </footer>
                    </section>

                    <section>
                        <header>
                            <h1 class="hIconSay"><q>文章：</q><a href="#">网页Javascript提交OutLook发送邮件OutLook发送邮件</a><q>有了新评论</q></h1>
                            <time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>
                            <span>来自：<a href="#">王睿</a>&nbsp;&nbsp;<a href="#" title="查看详细" class="detailsLink"></a></span>
                            <div>栏目：<a href="#">javascript</a></div>
                        </header>
                        <div>
                            这篇文章写的很好！不错
                        </div>
                        <footer>
                            <div><a href="#">阅读(0)</a><a href="#">评论(0)</a></div>
                        </footer>
                    </section>

                    <section>
                        <header>
                            <h1 class="hIconSay"><a href="#">新的留言</a></h1>
                            <time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>
                            <span>来自：<a href="#">黄小伟</a>&nbsp;&nbsp;<a href="#" title="查看详细" class="detailsLink"></a></span>
                        </header>
                        <div>
                            好久来踢球瑟
                        </div>
                        <footer class="lh250">
                            回复：<input class="textStyle1 w200" type="text" weakChar='true' maxlength="100" value="字数不超过100字" />
                        </footer>
                    </section>

                    <section>
                        <header>
                            <h1 class="hIconSay"><q>照片：</q><a href="#">ttttt.jpg</a><q>有了新评论</q></h1>
                            <time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>
                            <span>来自：<a href="#">黄小伟</a>&nbsp;&nbsp;<a href="#" title="查看详细" class="detailsLink"></a></span>
                            <div>相册：<a href="#">球星</a></div>
                        </header>
                        <div>
                            <figure class="IndexPicSingle">
                                <img src="../Images/henry.jpg" />
                                <figcaption>
                                    海布里大帝就是帅气，海布里大帝就是帅气，海布里大帝就是帅气，海布里大帝就是帅气，海布里大帝就是帅气
                                </figcaption>
                            </figure>
                        </div>
                        <footer class="lh250">
                            回复：<input class="textStyle1 w200" type="text" weakChar='true' maxlength="100" value="字数不超过100字" />
                        </footer>
                    </section>

                    <section>
                        <header>
                            <h1 class="hIconSay"><q>签名：</q><a href="#">我靠我靠我靠我靠！</a><q>有了新评论</q></h1>
                            <time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>
                            <span>来自：<a href="#">张坤</a>&nbsp;&nbsp;<a href="#" title="查看详细" class="detailsLink"></a></span>
                        </header>
                        <div>
                            好久来踢球瑟
                        </div>
                        <footer class="lh250">
                            回复：<input class="textStyle1 w200" type="text" weakChar='true' maxlength="100" value="字数不超过100字"/>
                        </footer>
                    </section>

                    <section>
                        <header>
                            <h1 class="hIconSay"><q>视频：</q><a href="#">莫斯科机车手疯狂上班路，后面更刺激，足以血脉膨胀...</a><q>有了新评论</q></h1>
                            <time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>
                            <span>来自：<a href="#">黄小伟</a>&nbsp;&nbsp;<a href="#" title="查看详细" class="detailsLink"></a></span>
                        </header>
                        <figure class="pr">
                            <img class="vedioPic" src="http://g1.ykimg.com/1100641F464D8ADA3C158004CA3FD3BA68291E-98AA-B482-7DCC-9F2639647B76" />
                            <div class="vedioPlay" title="点击播放"></div>
                            <figcaption>莫斯科机车手疯狂上班路，后面更刺激，足以血脉膨胀...快的车手就是不怕死的人，看你心脏能撑多久，这位兄台估计身患绝症，临死前也要干一次大事！后半部分更BT</figcaption>
                        </figure>
                        <footer class="lh250">
                            回复：<input class="textStyle1 w200" type="text" weakChar='true' maxlength="100" value="字数不超过100字"/>
                        </footer>
                    </section>
                </section>
                <!--图片-->
                <section class="sectionContentWeap" id="sectionForPicture">
                    <header><h1>图片</h1></header>
                    <section>
                        
                    </section>
                </section>
                <!--小组-->
                <!--会员-->
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptPlace" runat="server">
    <script src="../Javascript/page/index.js"></script>
</asp:Content>
