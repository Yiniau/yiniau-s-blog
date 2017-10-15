import anime from 'animejs';

export default function fireworks() {

  const canvasEl = document.querySelector('.fireworks'); // 获取canvas元素
  const ctx = canvasEl.getContext('2d'); // getContext('2d')
  const numberOfParticules = 15; // 圆点颗粒的数量
  const GRAVITY = 10; // 重力常量 10px/s^2 可在相关实体中覆盖常量
  let pointerX = 0;
  let pointerY = 0;

  // 移动端和pc端分界
  const tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
  // 颜色列表
  const colors = ['#ff3074', '#18FF92', '#5A87FF', '#FBF38C'];

  /**
   * 设置canvas元素大小
   * @method setCanvasSize
   */
  function setCanvasSize() {
    canvasEl.width = window.innerWidth * 2;
    canvasEl.height = window.innerHeight * 2;
    canvasEl.style.width = window.innerWidth + 'px';
    canvasEl.style.height = window.innerHeight + 'px';
    ctx.scale(2, 2);
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
    const angle = anime.random(0, 360) * Math.PI / 180;
    const value = anime.random(30, 120);
    const radius = [-1, 1][anime.random(0, 1)] * value;
    const moveX = radius * Math.cos(angle) * 3; // 加宽宽度，调节效果
    const moveY = radius * Math.sin(angle) / 8; // 缩小爆发高度，即减低Y轴初速度

    // let startSpeed = Math.log10(moveY / 3 + 10) * 10; // 时长为3000 -> 3s
    let startSpeed = moveY / 3; // 时长为3000 -> 3s 收缩3倍的速度

    return {
      x: p.x + moveX,
      startSpeed,
    }
  }

  /**
   * 创建颗粒
   * @method createParticule
   * @param  {Particule.x}        x Particule.x
   * @param  {Particule.y}        y Particule.y
   * @return {Particule}          颗粒
   */
  function createParticule(x, y) {
    var p = {};
    // 基础样式设置
    p.x = x - 12;
    p.y = y - 12;
    p.color = colors[anime.random(0, colors.length - 1)];
    p.width = anime.random(20, 30);
    p.height = p.width + anime.random(-3, 3);
    p.alpha = 1;
    p.endPos = setParticuleDirection(p);

    // 重力相关
    p.gravity = 10; // 重力效果 单位为 px/s^2
    p.startTime = performance.now();
    p.dropDeep = 0;
    p.startSpeed = p.endPos.startSpeed; // 当前速度 单位为 px/s

    p.draw = function() {
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      //  重力效果设置
      if (GRAVITY && p.startTime) {
        const g = p.gravity || GRAVITY;
        // v𝗍² - v₀² = 2gh
        // ∆h = (v𝗍² - v₀²) ÷ 2g
        const changedSpeed = (performance.now() - p.startTime) / 1000 * g;
        const vo2 = Math.pow(p.startSpeed, 2);
        const vt2 = Math.pow(p.startSpeed + changedSpeed, 2);
        p.dropDeep = (vt2 - vo2) / 2 * g;
      }
      ctx.rect(p.x, p.y + p.dropDeep, p.width, p.height);
      ctx.fillStyle = p.color;
      ctx.fill();
      ctx.globalAlpha = 1;
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
  function createCircle(x, y) {
    const p = {};
    p.x = x;
    p.y = y;
    p.color = '#333333';
    p.radius = 0.1;
    p.alpha = 0.5;
    p.lineWidth = 13;
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
    anim.animatables.forEach(el => el.target.draw());
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
        x: p => p.endPos.x,
        width: 0,
        height: 0,

        duration: 3000,
        easing: 'linear',
        update: renderParticule,
      })
      .add({
        targets: circle,
        radius: anime.random(90, 150),
        lineWidth: 0,
        alpha: {
          value: 0,
          easing: 'linear',
          duration: anime.random(600, 800),
        },
        duration: anime.random(1200, 1800),
        easing: 'easeOutExpo',
        update: renderParticule,
        offset: 0,
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
