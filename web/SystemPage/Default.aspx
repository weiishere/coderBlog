<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage/GlobleMasterPage.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="web.SystemPage.Default" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title>����-You.coder.com</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="subMenuPlace" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlace" runat="server">
    <div class="mainContent clearfix">
        
        <aside class="IndexSideBar" id="IndexSideBar">
            <input type="button" value="��" class="toggleBar" id="toggleBar" title="����(��ʾ)�����/��Ϣ��"/>
            <ul id="sideBarMenu">
                <li order="Feed"><h2>��̬</h2></li>
                <li order="Mine"><h2>�ҵ�</h2></li>
                <li order="Picture"><h2>ͼƬ</h2></li>
                <li order="'Group"><h2>����</h2></li>
                <li order="User"><h2>��Ա</h2></li>
            </ul>
        </aside>
        <div class="contentOutWrap">
            <section class="siteInfoWrap" id="siteInfoWrap">
                <header><h1>&nbsp;���棺</h1></header>
                <div><a href="#">������������Ա�����ƶ�</a></div>
                <span class="fr">���ն�̬��22�����ʴ�����155&nbsp;</span>
            </section>
            <div class="contentWrap">
                <!--��̬-->
                <section class="sectionContentWeap" style="margin-left:20px;display:block" id="sectionForFeed">
                    <header><h1>���¶�̬</h1></header>
                    <!--����-->
                    <section>
                        <header>
                            <h1 class="hIconArticle"><a href="#">��ҳJavascript�ύOutLook�����ʼ�</a></h1>
                            <time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>
                            <span>���ߣ�<a href="#">��Сΰ</a>&nbsp;&nbsp;<a href="#" title="�鿴��ϸ" class="detailsLink"></a></span>
                            <div>��Ŀ��<a href="#">javascript</a></div>
                        </header>
                        <div>
                            ��ҳJavascript�ύOutLook�����ʼ���ҳJavascript�ύOutLook�����ʼ���ҳJavascript�ύOutLook�����ʼ���ҳJavascript�ύOutLook�����ʼ���ҳJavascript�ύOutLook�����ʼ���ҳJavascript�ύOutLook�����ʼ���ҳJavascript�ύOutLook�����ʼ���ҳJavascript�ύOutLook�����ʼ���ҳJavascript�ύOutLook�����ʼ�
                        </div>
                        <footer>
                            <div><a href="#">�Ķ�(0)</a><a href="#">����(0)</a><a href="#">�ղ�(0)</a></div>
                        </footer>
                    </section>
                    <!--����-->
                    <section>
                        <header>
                            <h1 class="hIconArticle"><a href="#">jquery���ù��ܹ���</a></h1>
                            <time datetime="2012-9-25T12:11:41">2012-9-25 12:11:41</time>
                            <span>���ߣ�<a href="#">��Сΰ</a>&nbsp;&nbsp;<a href="#" title="�鿴��ϸ" class="detailsLink"></a></span>
                            <div>��Ŀ��<a href="#">javascript</a></div>
                        </header>
                        <div>
                            jQuery����ƻ�ı���дJavaScript����ķ�ʽ��������ѧϰʹ��JS������ҳ�ĸ��Ӷȣ������ҳJS����Ч�ʣ����۶���js��ѧ�߻�������ר�ң�jQuery������������ѡ��jQuery�ʺ������ʦ���������Լ���Щ�����ߣ�ͬ���ʺ�������ҵ����������˵jQuery�ʺ��κ�JavaScriptӦ�õĵط��������ڲ�ͬ��WebӦ�ó�����
                        </div>
                        <footer>
                            <div><a href="#">�Ķ�(0)</a><a href="#">����(0)</a><a href="#">�ղ�(0)</a></div>
                        </footer>
                    </section>
                    <!--ͼƬ-->
                    <section>
                        <header>
                            <h1 class="hIconPic"><a href="#">��������.jpg</a></h1>
                            <time datetime="2012-9-25T12:11:41">2012-9-25 12:11:41</time>
                            <span>���ߣ�<a href="#">��Сΰ</a>&nbsp;&nbsp;<a href="#" title="�鿴��ϸ" class="detailsLink"></a></span>
                            <div>��᣺<a href="#">����</a></div>
                        </header>
                        <div>
                            <figure class="IndexPiclist">
                                <img src="../Images/henry.jpg" />
                                <img src="../Images/henry.jpg" />
                                <img src="../Images/henry.jpg" />
                                <figcaption>
                                    �������۾���˧�����������۾���˧�����������۾���˧�����������۾���˧�����������۾���˧��
                                </figcaption>
                            </figure>
                        </div>
                        <footer>
                            <div><a href="#">�Ķ�(0)</a><a href="#">����(0)</a><a href="#">�ղ�(0)</a></div>
                        </footer>
                    </section>
                    <!--ǩ��-->
                    <section>
                        <header>
                            <h1 class="hIconSay"><a href="#">û���˻�������һ���ӣ�������Ҫ��Ӧ�¶���û���˻����һ���ӣ�������Ҫ��...</a></h1>
                            <time datetime="2012-9-25T12:11:41">2012-9-25 12:11:41</time>
                            <span><a href="#" title="�鿴��ϸ" class="detailsLink"></a></span>
                            <div>���ԣ�<a href="#">����ΰ</a></div>
                        </header>
                        <div>
                            û���˻�������һ���ӣ�������Ҫ��Ӧ�¶���û���˻����һ���ӣ�������Ҫ�ܶ�һ��
                        </div>
                        <footer>
                            <div><a href="#">�Ķ�(0)</a><a href="#">����(0)</a><a href="#">�ղ�(0)</a></div>
                        </footer>
                    </section>
                    <!--����-->
                    <section>
                        <header>
                            <h1 class="hIconAudio"><a href="#">׷�γ�����-GALA</a></h1>
                            <time datetime="2012-9-25T12:11:41">2012-9-25 12:11:41</time>
                            <span><a href="#" title="�鿴��ϸ" class="detailsLink"></a></span>
                            <div>���ԣ�<a href="#">����ΰ</a></div>
                        </header>
                        <div>
                            <embed src="http://www.xiami.com/widget/0_1770127756/singlePlayer.swf" type="application/x-shockwave-flash" width="257" height="33" wmode="transparent" >
                            <p>
                                �����ʻ������絽��������������Ĵ�����ô��һ����ȥ��������������ߵ�ɽ�崣�������ں����ǲ��������ͱ�
                            </p>
                        </div>
                        <footer>
                            <div><a href="#">�Ķ�(0)</a><a href="#">����(0)</a><a href="#">�ղ�(0)</a></div>
                        </footer>
                    </section>
                    <!--��Ƶ-->
                    <section>
                        <header>
                            <h1 class="hIconVedio"><a href="#">Ī˹�ƻ����ַ���ϰ�·��������̼�������Ѫ������...</a></h1>
                            <time datetime="2012-9-25T12:11:41">2012-9-25 12:11:41</time>
                            <span><a href="#" title="�鿴��ϸ" class="detailsLink"></a></span>
                            <div>���ԣ�<a href="#">����ΰ</a></div>
                        </header>
                        <div>
                            <figure class="pr">
                                <img class="vedioPic" src="http://g1.ykimg.com/1100641F464D8ADA3C158004CA3FD3BA68291E-98AA-B482-7DCC-9F2639647B76" />
                                <div class="vedioPlay" title="�������"></div>
                                <figcaption>Ī˹�ƻ����ַ���ϰ�·��������̼�������Ѫ������...��ĳ��־��ǲ��������ˣ����������ܳŶ�ã���λ��̨��������֢������ǰҲҪ��һ�δ��£���벿�ָ�BT</figcaption>
                            </figure>
                        </div>
                        <footer>
                            <div><a href="#">�Ķ�(0)</a><a href="#">����(0)</a><a href="#">�ղ�(0)</a></div>
                        </footer>
                    </section>
                </section>
                <!--�ҵ�-->
                <section class="sectionContentWeap" id="sectionForMine">
                    <header><h1>������</h1></header>
                    <section>
                        <header>
                            <h1 class="hIconSay"><q>���£�</q><a href="#">��ҳJavascript�ύOutLook�����ʼ�</a><q>����������</q></h1>
                            <time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>
                            <span>���ԣ�<a href="#">���</a>&nbsp;&nbsp;<a href="#" title="�鿴��ϸ" class="detailsLink"></a></span>
                            <div>��Ŀ��<a href="#">javascript</a></div>
                        </header>
                        <div>
                            ��ƪ����д�ĺܺã�����
                        </div>
                        <footer>
                            <div><a href="#">�Ķ�(0)</a><a href="#">����(0)</a></div>
                        </footer>
                    </section>

                    <section>
                        <header>
                            <h1 class="hIconSay"><q>���£�</q><a href="#">��ҳJavascript�ύOutLook�����ʼ�OutLook�����ʼ�</a><q>����������</q></h1>
                            <time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>
                            <span>���ԣ�<a href="#">���</a>&nbsp;&nbsp;<a href="#" title="�鿴��ϸ" class="detailsLink"></a></span>
                            <div>��Ŀ��<a href="#">javascript</a></div>
                        </header>
                        <div>
                            ��ƪ����д�ĺܺã�����
                        </div>
                        <footer>
                            <div><a href="#">�Ķ�(0)</a><a href="#">����(0)</a></div>
                        </footer>
                    </section>

                    <section>
                        <header>
                            <h1 class="hIconSay"><a href="#">�µ�����</a></h1>
                            <time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>
                            <span>���ԣ�<a href="#">��Сΰ</a>&nbsp;&nbsp;<a href="#" title="�鿴��ϸ" class="detailsLink"></a></span>
                        </header>
                        <div>
                            �þ�������ɪ
                        </div>
                        <footer class="lh250">
                            �ظ���<input class="textStyle1 w200" type="text" weakChar='true' maxlength="100" value="����������100��" />
                        </footer>
                    </section>

                    <section>
                        <header>
                            <h1 class="hIconSay"><q>��Ƭ��</q><a href="#">ttttt.jpg</a><q>����������</q></h1>
                            <time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>
                            <span>���ԣ�<a href="#">��Сΰ</a>&nbsp;&nbsp;<a href="#" title="�鿴��ϸ" class="detailsLink"></a></span>
                            <div>��᣺<a href="#">����</a></div>
                        </header>
                        <div>
                            <figure class="IndexPicSingle">
                                <img src="../Images/henry.jpg" />
                                <figcaption>
                                    �������۾���˧�����������۾���˧�����������۾���˧�����������۾���˧�����������۾���˧��
                                </figcaption>
                            </figure>
                        </div>
                        <footer class="lh250">
                            �ظ���<input class="textStyle1 w200" type="text" weakChar='true' maxlength="100" value="����������100��" />
                        </footer>
                    </section>

                    <section>
                        <header>
                            <h1 class="hIconSay"><q>ǩ����</q><a href="#">�ҿ��ҿ��ҿ��ҿ���</a><q>����������</q></h1>
                            <time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>
                            <span>���ԣ�<a href="#">����</a>&nbsp;&nbsp;<a href="#" title="�鿴��ϸ" class="detailsLink"></a></span>
                        </header>
                        <div>
                            �þ�������ɪ
                        </div>
                        <footer class="lh250">
                            �ظ���<input class="textStyle1 w200" type="text" weakChar='true' maxlength="100" value="����������100��"/>
                        </footer>
                    </section>

                    <section>
                        <header>
                            <h1 class="hIconSay"><q>��Ƶ��</q><a href="#">Ī˹�ƻ����ַ���ϰ�·��������̼�������Ѫ������...</a><q>����������</q></h1>
                            <time datetime="2012-9-25T12:11:41" pubdate>2012-9-25 12:11:41</time>
                            <span>���ԣ�<a href="#">��Сΰ</a>&nbsp;&nbsp;<a href="#" title="�鿴��ϸ" class="detailsLink"></a></span>
                        </header>
                        <figure class="pr">
                            <img class="vedioPic" src="http://g1.ykimg.com/1100641F464D8ADA3C158004CA3FD3BA68291E-98AA-B482-7DCC-9F2639647B76" />
                            <div class="vedioPlay" title="�������"></div>
                            <figcaption>Ī˹�ƻ����ַ���ϰ�·��������̼�������Ѫ������...��ĳ��־��ǲ��������ˣ����������ܳŶ�ã���λ��̨��������֢������ǰҲҪ��һ�δ��£���벿�ָ�BT</figcaption>
                        </figure>
                        <footer class="lh250">
                            �ظ���<input class="textStyle1 w200" type="text" weakChar='true' maxlength="100" value="����������100��"/>
                        </footer>
                    </section>
                </section>
                <!--ͼƬ-->
                <section class="sectionContentWeap" id="sectionForPicture">
                    <header><h1>ͼƬ</h1></header>
                    <section>
                        
                    </section>
                </section>
                <!--С��-->
                <!--��Ա-->
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ScriptPlace" runat="server">
    <script src="../Javascript/page/index.js"></script>
</asp:Content>
