import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "./",
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/api": {
        target: "http://mobile.chothuetatca.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        booking: resolve(__dirname, "booking.html"),
        bookingDetail: resolve(__dirname, "booking-detail.html"),
        login: resolve(__dirname, "login.html"),
        register: resolve(__dirname, "register.html"),
        registerAppointment: resolve(__dirname, "register-appointment.html"),
        historyBooking: resolve(__dirname, "history-booking.html"),
        historyFilter: resolve(__dirname, "history-filter.html"),
        newsDetail: resolve(__dirname, "news-detail.html"),
        productDetail: resolve(__dirname, "product-detail.html"),
        products: resolve(__dirname, "products.html"),
      },
    },
  },
});
