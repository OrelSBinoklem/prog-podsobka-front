//todo неработает надо посмотреть на старом сайте там надо в package.json с какимто ключём его устанавливать!
require(['emmet'],function (data) { // this is huge. so require it async is better
  window.emmet = data.emmet;
});