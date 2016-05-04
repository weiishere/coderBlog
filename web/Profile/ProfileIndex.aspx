<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage/UserProfile.master" AutoEventWireup="true" CodeBehind="ProfileIndex.aspx.cs" Inherits="web.Profile.ProfileIndex" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlace" runat="server">
    <section class="profileSectionContentWeap" id="sectionForMine">
        <header><h1>博客首页</h1></header>
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
    <div class="profileIndexPageWrap">

    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptPlace" runat="server">
</asp:Content>
