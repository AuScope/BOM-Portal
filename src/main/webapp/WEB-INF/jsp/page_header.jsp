   <div id="header-container">
      <div id="logo">
         <h1>
            <a href="#" onclick="window.open('about.html','AboutWin','toolbar=no, menubar=no,location=no,resizable=no,scrollbars=yes,statusbar=no,top=100,left=200,height=650,width=450');return false"><img alt="BOM banner" src="img/img-bom-banner.jpg"></a>
         </h1>
      </div>
      <div id="menu">
         <ul >
            <security:authorize ifAllGranted="ROLE_ADMINISTRATOR">
                <li ><a href="admin.html">Administration<span></span></a></li>
            </security:authorize>
            <li ><a href="login.html">Login<span></span></a></li>
         </ul>
      </div>
      <span id="latlng" class="input-text"></span>
      <div id="permalinkicon"><a href="javascript:void(0)"><img src="img/link.png" width="16" height="16"/></a></div>
      <div id="permalink"><a href="javascript:void(0)">Permanent Link</a></div>


   </div>
