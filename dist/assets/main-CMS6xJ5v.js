import"./config-CAO_t3db.js";/* empty css               */import"./data-DEhFnekE.js";const s=document.querySelector(".hamburger"),o=document.querySelector(".nav-menu");s&&s.addEventListener("click",()=>{s.classList.toggle("active"),o.classList.toggle("active")});function i(){fetch("/api/user/user_list/").then(e=>e.json()).then(e=>{console.log("API Response:",e);const n=document.querySelectorAll(".service");e&&Array.isArray(e)?n.forEach((a,t)=>{e[t]&&e[t].name&&(a.textContent=e[t].name)}):e&&e.data&&Array.isArray(e.data)&&n.forEach((a,t)=>{e.data[t]&&e.data[t].name&&(a.textContent=e.data[t].name)})}).catch(e=>console.log("API Error:",e))}window.addEventListener("DOMContentLoaded",i);document.querySelectorAll(".nav-menu a").forEach(e=>e.addEventListener("click",()=>{s.classList.remove("active"),o.classList.remove("active")}));document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",function(n){n.preventDefault();const a=document.querySelector(this.getAttribute("href"));a&&a.scrollIntoView({behavior:"smooth",block:"start"})})});window.addEventListener("scroll",()=>{const e=document.querySelector(".header");window.scrollY>100?(e.style.background="rgba(255, 255, 255, 0.95)",e.style.backdropFilter="blur(10px)"):(e.style.background="#fff",e.style.backdropFilter="none")});document.addEventListener("DOMContentLoaded",function(){l()});function l(){fetch("https://api.chothuetatca.com/api/blog/list").then(e=>e.json()).then(e=>{document.getElementById("newsLoading").style.display="none",document.getElementById("newsGrid").style.display="grid";let n=[];e.data&&Array.isArray(e.data)?n=e.data.slice(0,6):Array.isArray(e)&&(n=e.slice(0,6)),d(n)}).catch(e=>{console.log("Error loading news:",e),document.getElementById("newsLoading").innerHTML='<p style="color:#666;">Không thể tải tin tức</p>'})}function d(e){const n=document.getElementById("newsGrid");if(e.length===0){n.innerHTML='<p style="text-align:center; color:#666; grid-column:1/-1;">Chưa có tin tức</p>';return}const a="https://api.chothuetatca.com";n.innerHTML=e.map(t=>{let r=t.image||t.thumbnail||t.avatar||"";r&&!r.startsWith("http")&&(r=a+r),r||(r="/public/images/logo.png");const c=`news-detail.html?id=${t.id}`;return`
            <div class="news-card" onclick="window.location.href='${c}'" style="cursor:pointer;">
                <div class="news-image">
                    <img src="${r}" alt="${t.title||t.name||"Tin tức"}" onerror="this.src='/public/images/logo.png'">
                </div>
                <div class="news-content">
                    <span class="news-date"><i class="fas fa-calendar"></i> ${f(t.created_at||t.date)}</span>
                    <h3>${t.title||t.name||"Tin tức"}</h3>
                    <p>${h(t.description||t.content||t.des||"",100)}</p>
                    <a href="${c}" class="news-link">Xem thêm <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        `}).join("")}function f(e){if(!e)return"";try{return new Date(e).toLocaleDateString("vi-VN")}catch{return e}}function h(e,n){if(!e)return"";const a=e.replace(/<[^>]*>/g,"");return a.length<=n?a:a.substring(0,n)+"..."}document.addEventListener("DOMContentLoaded",function(){const e=JSON.parse(sessionStorage.getItem("currentUser")),n=document.getElementById("authNav"),a=document.getElementById("registerNav");e&&(n.innerHTML=`
                <div class="user-dropdown">
                    <a href="#" class="user-btn">
                        <i class="fas fa-user-circle"></i>
                        <span>${e.username||e.phone}</span>
                        <i class="fas fa-chevron-down"></i>
                    </a>
                    <div class="dropdown-menu">
                        <a href="booking.html"><i class="fas fa-calendar-plus"></i> Đặt lịch</a>
                        <a href="history-booking.html"><i class="fas fa-calendar-check"></i> Lịch sử đặt lịch</a>
                        <a href="history-filter.html"><i class="fas fa-filter"></i> Nhật ký thay lõi</a>
                        <a href="#" onclick="logout(); return false;"><i class="fas fa-sign-out-alt"></i> Đăng xuất</a>
                    </div>
                </div>
            `,a.style.display="none")});
