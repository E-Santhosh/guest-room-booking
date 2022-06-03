const template = document.createElement('template');
template.innerHTML = `
<nav>
      <img src="/images/logo11.png" style="border-radius: 100px; height: 100px;; width: 100px;;;" class="logo">
      <ul>
          <li><a href="/">HOME</a></li>
          <li><a href="/home1">ABOUT</a></li>
          <li><a href="/rooms1">AVAILABLE ROOMS</a></li>
          <li><a href="/CRegister">CUSTOMER</a></li>
          <li><a href="/oRegister">OWNER</a></li>
      </ul>
  </nav>`
document.body.appendChild(template.content);


   