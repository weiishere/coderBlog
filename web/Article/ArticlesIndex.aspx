<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage/GlobleMasterPage.Master" AutoEventWireup="true" CodeBehind="ArticlesIndex.aspx.cs" Inherits="web.Article.ArticlesIndex" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title>文章</title>
    <link href="../Style/themes/default/article.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlace" runat="server">
    <div class="articleOutWrap bd1">
        <div class="articleHeadWrap">
            <div id="toggleForModule" order="module">栏目</div>
            <nav>
                <span id="command_new" class="articleHeadWrap_span_hover">最新</span>
                <span id="command_hot">最热</span>
            </nav>
            <div id="toggleForTag" order="tag">标签</div>
        </div>
        <div class="articleWrapBody">
            <aside id="article_moduleBar">
                <nav>
                    <ul>
                        <li><a href="#">javascipt</a></li>
                        <li><a href="#">asp.net</a></li>
                        <li><a href="#">wcf</a></li>
                        <li><a href="#">程序人生</a></li>
                        <li><a href="#">活动组织</a></li>
                        <li><a href="#">android</a></li>
                    </ul>
                </nav>
            </aside>
            <section id="a_listContentWrap">
                <div id="wrap_1">
                    <div class="previewWrap" id="previewWrap">
                        <span order="ListMode" title="列表模式"></span><span order="PreviewMode" title="预览模式"></span>
                    </div>
                    <h1>最新文章</h1>
                    <nav>
                        <ul class="articlesPreviewMode" sign="articlesPreviewMode">
                            <li>
                                <section>
                                    <header>
                                        <h2 class="hIconArticle"><a href="#">网页Javascript提交OutLook发送邮件</a></h2>
                                        <time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>
                                        <span>作者：<a href="#">黄小伟</a></span>
                                        <div>栏目：<a href="#">javascript</a></div>
                                    </header>
                                    <div>
                                        网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件
                                    </div>
                                    <footer>
                                        <div><a href="#">阅读(0)</a><a href="#">评论(0)</a><a href="#">收藏(0)</a></div>
                                    </footer>
                                </section>
                            </li>
                            <li>
                                <section>
                                    <header>
                                        <h2 class="hIconArticle"><a href="#">网页Javascript提交OutLook发送邮件</a></h2>
                                        <time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>
                                        <span>作者：<a href="#">黄小伟</a></span>
                                        <div>栏目：<a href="#">javascript</a></div>
                                    </header>
                                    <div>
                                        网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件
                                    </div>
                                    <footer>
                                        <div><a href="#">阅读(0)</a><a href="#">评论(0)</a><a href="#">收藏(0)</a></div>
                                    </footer>
                                </section>
                            </li>
                            <li>
                                <section>
                                    <header>
                                        <h2 class="hIconArticle"><a href="#">网页Javascript提交OutLook发送邮件</a></h2>
                                        <time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>
                                        <span>作者：<a href="#">黄小伟</a></span>
                                        <div>栏目：<a href="#">javascript</a></div>
                                    </header>
                                    <div>
                                        网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件
                                    </div>
                                    <footer>
                                        <div><a href="#">阅读(0)</a><a href="#">评论(0)</a><a href="#">收藏(0)</a></div>
                                    </footer>
                                </section>
                            </li>
                        </ul>

                        <ul class="articlesListMode dhidden" sign="articlesListMode">
                            <li>
                                <h2 class="hIconArticle"><a href="#">网页Javascript提交OutLook发送邮件22</a></h2>
                                <span><time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>&nbsp;|&nbsp;<a href="#">黄小伟</a>&nbsp;</span>
                            </li>
                            <li>
                                <h2 class="hIconArticle"><a href="#">网页Javascript提交OutLook发送邮件22</a></h2>
                                <span><time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>&nbsp;|&nbsp;<a href="#">黄小伟</a>&nbsp;</span>
                            </li>
                            <li>
                                <h2 class="hIconArticle"><a href="#">网页Javascript提交OutLook发送邮件22</a></h2>
                                <span><time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>&nbsp;|&nbsp;<a href="#">黄小伟</a>&nbsp;</span>
                            </li>
                            <li>
                                <h2 class="hIconArticle"><a href="#">网页Javascript提交OutLook发送邮件22</a></h2>
                                <span><time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>&nbsp;|&nbsp;<a href="#">黄小伟</a>&nbsp;</span>
                            </li>
                            <li>
                                <h2 class="hIconArticle"><a href="#">网页Javascript提交OutLook发送邮件22</a></h2>
                                <span><time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>&nbsp;|&nbsp;<a href="#">黄小伟</a>&nbsp;</span>
                            </li>
                            <li>
                                <h2 class="hIconArticle"><a href="#">网页Javascript提交OutLook发送邮件22</a></h2>
                                <span><time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>&nbsp;|&nbsp;<a href="#">黄小伟</a>&nbsp;</span>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div id="wrap_2">
                    <h1>最热文章</h1>
                    <nav>
                        <ul class="articlesPreviewMode" sign="articlesPreviewMode">
                            <li>
                                <section>
                                    <header>
                                        <h2 class="hIconArticle"><a href="#">网页Javascript提交OutLook发送邮件22222222222</a></h2>
                                        <time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>
                                        <span>作者：<a href="#">黄小伟</a></span>
                                        <div>栏目：<a href="#">javascript</a></div>
                                    </header>
                                    <div>
                                        网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件
                                    </div>
                                    <footer>
                                        <div><a href="#">阅读(0)</a><a href="#">评论(0)</a><a href="#">收藏(0)</a></div>
                                    </footer>
                                </section>
                            </li>
                            <li>
                                <section>
                                    <header>
                                        <h2 class="hIconArticle"><a href="#">网页Javascript提交OutLook发送邮件</a></h2>
                                        <time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>
                                        <span>作者：<a href="#">黄小伟</a></span>
                                        <div>栏目：<a href="#">javascript</a></div>
                                    </header>
                                    <div>
                                        网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件
                                    </div>
                                    <footer>
                                        <div><a href="#">阅读(0)</a><a href="#">评论(0)</a><a href="#">收藏(0)</a></div>
                                    </footer>
                                </section>
                            </li>
                            <li>
                                <section>
                                    <header>
                                        <h2 class="hIconArticle"><a href="#">网页Javascript提交OutLook发送邮件</a></h2>
                                        <time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>
                                        <span>作者：<a href="#">黄小伟</a></span>
                                        <div>栏目：<a href="#">javascript</a></div>
                                    </header>
                                    <div>
                                        网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件网页Javascript提交OutLook发送邮件
                                    </div>
                                    <footer>
                                        <div><a href="#">阅读(0)</a><a href="#">评论(0)</a><a href="#">收藏(0)</a></div>
                                    </footer>
                                </section>
                            </li>
                        </ul>

                        <ul class="articlesListMode dhidden" sign="articlesListMode">
                            <li>
                                <h2 class="hIconArticle"><a href="#">网页Javascript提交OutLook发送邮件22222222222</a></h2>
                                <span><time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>&nbsp;|&nbsp;<a href="#">黄小伟</a>&nbsp;</span>
                            </li>
                            <li>
                                <h2 class="hIconArticle"><a href="#">网页Javascript提交OutLook发送邮件22</a></h2>
                                <span><time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>&nbsp;|&nbsp;<a href="#">黄小伟</a>&nbsp;</span>
                            </li>
                            <li>
                                <h2 class="hIconArticle"><a href="#">网页Javascript提交OutLook发送邮件22</a></h2>
                                <span><time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>&nbsp;|&nbsp;<a href="#">黄小伟</a>&nbsp;</span>
                            </li>
                            <li>
                                <h2 class="hIconArticle"><a href="#">网页Javascript提交OutLook发送邮件22</a></h2>
                                <span><time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>&nbsp;|&nbsp;<a href="#">黄小伟</a>&nbsp;</span>
                            </li>
                            <li>
                                <h2 class="hIconArticle"><a href="#">网页Javascript提交OutLook发送邮件22</a></h2>
                                <span><time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>&nbsp;|&nbsp;<a href="#">黄小伟</a>&nbsp;</span>
                            </li>
                            <li>
                                <h2 class="hIconArticle"><a href="#">网页Javascript提交OutLook发送邮件22</a></h2>
                                <span><time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>&nbsp;|&nbsp;<a href="#">黄小伟</a>&nbsp;</span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </section>
            
            <aside id="article_tagBar">
                <nav>
                    <ul>
                        <li><a href="#">求助</a></li>
                        <li><a href="#">asp.net</a></li>
                        <li><a href="#">wcf</a></li>
                        <li><a href="#">美图</a></li>
                        <li><a href="#">搞笑</a></li>
                        <li><a href="#">数码</a></li>
                    </ul>
                </nav>
            </aside>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptPlace" runat="server">
    <script src="../Javascript/common/TabControl.js"></script>
    <script src="../Javascript/page/article.js"></script>
</asp:Content>
