// vite.config.js
import { defineConfig } from "file:///G:/Project/Major%20Project/portfolio-page/node_modules/vite/dist/node/index.js";
import react from "file:///G:/Project/Major%20Project/portfolio-page/node_modules/@vitejs/plugin-react/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules"))
            return;
          if (id.includes("three"))
            return "three";
          if (id.includes("@react-three"))
            return "react-three";
          if (id.includes("framer-motion"))
            return "framer-motion";
          if (id.includes("react-dom"))
            return "react-dom";
          if (id.includes("react"))
            return "react";
          return "vendor";
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJHOlxcXFxQcm9qZWN0XFxcXE1ham9yIFByb2plY3RcXFxccG9ydGZvbGlvLXBhZ2VcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkc6XFxcXFByb2plY3RcXFxcTWFqb3IgUHJvamVjdFxcXFxwb3J0Zm9saW8tcGFnZVxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRzovUHJvamVjdC9NYWpvciUyMFByb2plY3QvcG9ydGZvbGlvLXBhZ2Uvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcclxuICBidWlsZDoge1xyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBvdXRwdXQ6IHtcclxuICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcclxuICAgICAgICAgIGlmICghaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSByZXR1cm5cclxuXHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3RocmVlJykpIHJldHVybiAndGhyZWUnXHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ0ByZWFjdC10aHJlZScpKSByZXR1cm4gJ3JlYWN0LXRocmVlJ1xyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdmcmFtZXItbW90aW9uJykpIHJldHVybiAnZnJhbWVyLW1vdGlvbidcclxuXHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3JlYWN0LWRvbScpKSByZXR1cm4gJ3JlYWN0LWRvbSdcclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygncmVhY3QnKSkgcmV0dXJuICdyZWFjdCdcclxuXHJcbiAgICAgICAgICByZXR1cm4gJ3ZlbmRvcidcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG59KSJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVQsU0FBUyxvQkFBb0I7QUFDOVUsT0FBTyxXQUFXO0FBRWxCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixhQUFhLElBQUk7QUFDZixjQUFJLENBQUMsR0FBRyxTQUFTLGNBQWM7QUFBRztBQUVsQyxjQUFJLEdBQUcsU0FBUyxPQUFPO0FBQUcsbUJBQU87QUFDakMsY0FBSSxHQUFHLFNBQVMsY0FBYztBQUFHLG1CQUFPO0FBQ3hDLGNBQUksR0FBRyxTQUFTLGVBQWU7QUFBRyxtQkFBTztBQUV6QyxjQUFJLEdBQUcsU0FBUyxXQUFXO0FBQUcsbUJBQU87QUFDckMsY0FBSSxHQUFHLFNBQVMsT0FBTztBQUFHLG1CQUFPO0FBRWpDLGlCQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
