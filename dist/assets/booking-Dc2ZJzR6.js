import"./config-CAO_t3db.js";/* empty css               */import"./data-DEhFnekE.js";document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll(".service-option").forEach(e=>{e.addEventListener("click",function(){s(this.getAttribute("data-service"))})})});function s(e){var n;document.querySelectorAll(".service-option").forEach(t=>t.classList.remove("selected")),(n=document.querySelector(`[data-service="${e}"]`))==null||n.classList.add("selected"),localStorage.setItem("selectedService",e),window.location.href=`./register-appointment.html?service=${e}`}const c={"góp ý":"fa-comment-dots","khiếu nại":"fa-comment-dots","quản lý":"fa-clipboard-list","đơn hàng":"fa-clipboard-list","vệ sinh":"fa-broom",sửa:"fa-wrench",thay:"fa-sync-alt",lõi:"fa-filter","bảo dưỡng":"fa-tools",default:"fa-cog"};function r(e){const n=e.toLowerCase();for(const[t,a]of Object.entries(c))if(n.includes(t))return a;return c.default}document.addEventListener("DOMContentLoaded",function(){if(!JSON.parse(sessionStorage.getItem("currentUser"))){alert("Vui lòng đăng nhập để đặt lịch hẹn!"),window.location.href="./login.html";return}u(),l(),h()});function l(){fetch("/api/service/listService").then(e=>e.json()).then(e=>{console.log("Services API Response:",e),document.getElementById("servicesLoading").style.display="none",document.getElementById("serviceCards").style.display="grid";let n=[];e.data&&Array.isArray(e.data)?n=e.data:Array.isArray(e)&&(n=e),d(n)}).catch(e=>{console.log("Error loading services:",e),document.getElementById("servicesLoading").innerHTML=`
                    <i class="fas fa-exclamation-triangle" style="font-size:2rem; color:#dc3545;"></i>
                    <p style="margin-top:10px; color:#666;">Không thể tải dịch vụ. Vui lòng thử lại.</p>
                `})}function d(e){const n=document.getElementById("serviceCards");n.innerHTML="",e.forEach(t=>{const a=r(t.name||t.ten_dich_vu||""),o=document.createElement("div");o.className="service-option",o.dataset.serviceId=t.id,o.dataset.serviceName=t.name||t.ten_dich_vu||"Dịch vụ",o.innerHTML=`
                <div class="service-icon">
                    <i class="fas ${a}"></i>
                </div>
                <h3>${t.name||t.ten_dich_vu||"Dịch vụ"}</h3>
                <p class="service-type">${t.loai_dich_vu||t.service_type||"Dịch vụ thường"}</p>
                <button class="btn btn-outline" onclick="selectService(${t.id}, '${(t.name||t.ten_dich_vu||"").replace(/'/g,"\\'")}')">
                    Chọn Dịch Vụ
                </button>
            `,n.appendChild(o)}),e.length===0&&(n.innerHTML=`
                <div style="grid-column: 1/-1; text-align:center; padding:40px;">
                    <i class="fas fa-inbox" style="font-size:3rem; color:#ccc;"></i>
                    <p style="margin-top:15px; color:#666;">Chưa có dịch vụ nào</p>
                </div>
            `)}function u(){const e=JSON.parse(sessionStorage.getItem("currentUser")),n=document.getElementById("authNav"),t=document.getElementById("registerNav");e&&n&&(n.innerHTML=`
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
            `,t&&(t.style.display="none"))}function h(){const e=JSON.parse(sessionStorage.getItem("currentUser")),n=e?e.id:8968;fetch(`/api/user/listProduct/${n}`).then(t=>t.json()).then(t=>{console.log("Products API Response:",t);let a=[];t.data&&t.data.listProducts&&(a=t.data.listProducts.map(o=>({id:o.product?o.product.id:o.id,name:o.product?o.product.name:o.name||"Sản phẩm"}))),i(a)}).catch(t=>{console.log("Error loading products:",t),i([])})}function i(e){const n=document.getElementById("productModel");if(!n)return;n.innerHTML='<option value="">Chọn sản phẩm (nếu có)</option>',e.length>0&&e.forEach(a=>{const o=document.createElement("option");o.value=a.id||a.product_id||"",o.textContent=a.name||a.product_name||"Sản phẩm",n.appendChild(o)});const t=document.createElement("option");t.value="other",t.textContent="Khác",n.appendChild(t)}
