import"./config-CAO_t3db.js";/* empty css               */import"./auth-Bhon6bfG.js";document.addEventListener("DOMContentLoaded",function(){c(),r()});function c(){const s=JSON.parse(sessionStorage.getItem("currentUser")),n=document.getElementById("authNav"),a=document.getElementById("registerNav");s&&n&&(n.innerHTML=`
            <div class="user-dropdown">
                <a href="#" class="user-btn">
                    <i class="fas fa-user-circle"></i>
                    <span>${s.username||s.phone}</span>
                    <i class="fas fa-chevron-down"></i>
                </a>
                <div class="dropdown-menu">
                    <a href="booking.html"><i class="fas fa-calendar-plus"></i> Đặt lịch</a>
                    <a href="history-booking.html"><i class="fas fa-calendar-check"></i> Lịch sử đặt lịch</a>
                    <a href="history-filter.html"><i class="fas fa-filter"></i> Nhật ký thay lõi</a>
                    <a href="#" onclick="logout(); return false;"><i class="fas fa-sign-out-alt"></i> Đăng xuất</a>
                </div>
            </div>
        `,a&&(a.style.display="none"))}function r(){const s=JSON.parse(sessionStorage.getItem("currentUser")),n=s?s.id:8968;fetch(`/api/user/listProduct/${n}`).then(a=>a.json()).then(a=>{console.log("API Response:",a),document.getElementById("loading").style.display="none";let t=[];a.data&&a.data.listProducts&&(t=a.data.listProducts.map(e=>({id:e.product?e.product.id:e.id,name:e.product?e.product.name:e.name||"Sản phẩm",address:e.address||"",order_type:e.order_type_label||"",ngaymua:e.ngaymua||""}))),t.length>0?d(t):o()}).catch(a=>{console.log("Error:",a),o()})}function o(){document.getElementById("loading").style.display="none",document.getElementById("productsGrid").innerHTML=`
        <div style="grid-column: 1/-1; text-align:center; padding:60px;">
            <i class="fas fa-box-open" style="font-size:4rem; color:#ccc; margin-bottom:20px;"></i>
            <h3 style="color:#666; margin-bottom:10px;">Chưa có sản phẩm nào</h3>
            <p style="color:#888;">Vui lòng đăng nhập để xem sản phẩm của bạn</p>
            <a href="login.html" style="display:inline-block; margin-top:20px; padding:12px 30px; background:#28a745; color:white; border-radius:10px; text-decoration:none;">Đăng nhập</a>
        </div>
    `}function d(s){const n=document.getElementById("productsGrid");n.innerHTML="",s.forEach(a=>{const t=document.createElement("div");t.className="product-card",t.innerHTML=`
            <div class="product-image">
                <i class="fas fa-box no-image"></i>
            </div>
            <div class="product-info">
                ${a.order_type?`<span class="product-category">${a.order_type}</span>`:""}
                <h3 class="product-name">${a.name}</h3>
                ${a.address?`<p class="product-desc"><i class="fas fa-map-marker-alt"></i> ${a.address}</p>`:""}
                ${a.ngaymua?`<p class="product-stock in-stock"><i class="fas fa-calendar"></i> Ngày mua: ${a.ngaymua.split(" ")[0]}</p>`:""}
                <button class="product-btn" onclick="bookService('${a.name}')">
                    <i class="fas fa-calendar-plus"></i> Đặt lịch bảo dưỡng
                </button>
            </div>
        `,n.appendChild(t)})}
