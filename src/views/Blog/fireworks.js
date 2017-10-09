import anime from 'animejs';
export default function fireworks() {

  const canvasEl = document.querySelector('.fireworks'); // 获取canvas元素
  const ctx = canvasEl.getContext('2d'); // getContext('2d')
  const numberOfParticules = 25; // 圆点颗粒的数量
  let pointerX = 0;
  let pointerY = 0;

  // 移动端和pc端分界
  const tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
  // 颜色列表
  const colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];

  /**
   * 设置canvas元素大小
   * @method setCanvasSize
   */
  function setCanvasSize() {
    canvasEl.width = window.innerWidth * 2;
    canvasEl.height = window.innerHeight * 2;
    canvasEl.style.width = window.innerWidth + 'px';
    canvasEl.style.height = window.innerHeight + 'px';
    canvasEl.getContext('2d').scale(2, 2);
  }

  /**
   * 更新坐标
   * @method updateCoords
   * @param  {mouseEvent}     e 触摸或鼠标事件
   */
  function updateCoords(e) {
    pointerX = e.clientX || e.touches[0].clientX;
    pointerY = e.clientY || e.touches[0].clientY;
  }

  /**
   * 设置颗粒方向
   * @method setParticuleDirection
   * @param  {object}              p  颗粒 Particule
   * @return {object}              p  颗粒 Particule
   */
  function setParticuleDirection(p) {
    var angle = anime.random(0, 360) * Math.PI / 180;
    var value = anime.random(50, 180);
    var radius = [-1, 1][anime.random(0, 1)] * value;
    return {
      x: p.x + radius * Math.cos(angle),
      y: p.y + radius * Math.sin(angle)
    }
  }

  /**
   * 创建颗粒
   * @method createParticule
   * @param  {Particule.x}        x Particule.x
   * @param  {Particule.y}        y Particule.y
   * @return {Particule}          颗粒
   */
  function createParticule(x,y) {
    var p = {};
    p.x = x;
    p.y = y;
    p.color = colors[anime.random(0, colors.length - 1)];
    p.radius = anime.random(16, 32);
    p.endPos = setParticuleDirection(p);
    p.draw = function() {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
    return p;
  }

  /**
   * 创建圆(特效中的半透明的圆形波纹)
   * @method createCircle
   * @param  {Particule.x}     x Particule.x
   * @param  {Particule.y}     y Particule.y
   * @return {Particule}       颗粒
   */
  function createCircle(x,y) {
    const p = {};
    p.x = x;
    p.y = y;
    p.color = '#333333';
    p.radius = 0.1;
    p.alpha = .5;
    p.lineWidth = 6;
    p.draw = function() {
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
      ctx.lineWidth = p.lineWidth;
      ctx.strokeStyle = p.color;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    return p;
  }

  /**
   * 渲染颗粒(call when update)
   * @method renderParticule
   * @param  {animejs}        anim animejs引用
   */
  function renderParticule(anim) {
    for (var i = 0; i < anim.animatables.length; i++) {
      anim.animatables[i].target.draw();
    }
  }

  /**
   * 颗粒动画
   * @method animateParticules
   * @param  {Particule.x}          x Particule.x
   * @param  {Particule.y}          y Particule.y
   */
  function animateParticules(x, y) {
    const circle = createCircle(x, y);
    const particules = [];
    for (let i = 0; i < numberOfParticules; i++) {
      particules.push(createParticule(x, y));
    }
    anime.timeline()
      .add({
        targets: particules,
        x: function(p) { return p.endPos.x; },
        y: function(p) { return p.endPos.y; },
        radius: 0.1,
        duration: anime.random(1200, 1800),
        easing: 'easeOutExpo',
        update: renderParticule
      })
      .add({
        targets: circle,
        radius: anime.random(80, 160),
        lineWidth: 0,
        alpha: {
          value: 0,
          easing: 'linear',
          duration: anime.random(600, 800),
        },
        duration: anime.random(1200, 1800),
        easing: 'easeOutExpo',
        update: renderParticule,
        offset: 0
      });
  }

  // 渲染实例
  const render = anime({
    duration: Infinity,
    update: function() {
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    }
  });

  document.addEventListener(tap, function(e) {
    render.play();
    updateCoords(e);
    animateParticules(pointerX, pointerY);
  }, false);

  window.addEventListener('resize', setCanvasSize, false);

  setCanvasSize();
  return {
    render,
    setCanvasSize,
    animateParticules,
  }
};
