// 在页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('网站已加载完成！');
    
    // 添加简单的交互效果
    const header = document.querySelector('header');
    
    // 页面滚动时添加阴影效果
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // 计算并更新页面访问时间
    const year = new Date().getFullYear();
    const footerYear = document.querySelector('footer p');
    if (footerYear) {
        footerYear.innerHTML = footerYear.innerHTML.replace('2024', year);
    }
}); 