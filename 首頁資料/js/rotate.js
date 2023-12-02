//謝謝chatgpt改寫
document.addEventListener('DOMContentLoaded', function () {
    const ballx = [30, 60, 90, 120, 60];
    const bally = [0, 0, 0, 0, 0];
    const ballr = [20, 20, 20, 20, 20];

    function setPos(obj, x, y, r) {
        obj.style.width = String(r) + 'px';
        obj.style.height = String(r) + 'px';
        obj.style.top = String(window.innerHeight / 2 - y - r / 2) + 'px';
        obj.style.left = String(window.innerWidth / 2 + x - r / 2) + 'px';
    }

    for (let i = 1; i <= 4; i++) {
        setInterval(() => { setPos(document.getElementById('ball' + String(i)), ballx[i - 1], bally[i - 1], ballr[i - 1]); }, 0);
    }
    setInterval(() => { setPos(document.getElementById('ball5'), ballx[4], 0, ballr[4]); }, 0);

    document.getElementById('angle').defaultValue = 30;

    function rotate(num, a) {
        const myangle = a / 180 * Math.PI;
        const x = ballx[num - 1];
        const y = bally[num - 1];
        ballx[num - 1] = x * Math.cos(myangle) - y * Math.sin(myangle);
        bally[num - 1] = x * Math.sin(myangle) + y * Math.cos(myangle);
    }

    function move(num, x, y) {
        ballx[num - 1] += x;
        bally[num - 1] += y;
    }

    function toPolar(x, y) {
        return [(x**2 + y**2)**0.5, Math.atan2(y, x)];
    }

    function zmove(num, x, y) {
        ballx[num - 1] += x;
        bally[num - 1] += y;
        ballr[num - 1] = 10000 / (bally[num - 1] + 200);
    }

    vx = 0;
    vy = 2;
    function thinkingname() {
        const [dis, ang] = toPolar(ballx[0], bally[0]);
        const a = -120 / dis / dis;
        const ax = a * Math.cos(ang);
        const ay = a * Math.sin(ang);
        vx += ax;
        vy += ay;
        move(1, vx, vy);
    }

    setInterval(thinkingname, 10);

    velx = 0;
    vely = 4;
    function thinkname() {
        const [mydis, myang] = toPolar(ballx[1], bally[1]);
        const accer = -600 / mydis / mydis;
        const accerx = accer * Math.cos(myang);
        const accery = accer * Math.sin(myang);
        velx += accerx;
        vely += accery;
        move(2, velx, vely);
    }

    setInterval(thinkname, 1);

    const acceleration = -1000;
    let speed = 500;
    setInterval(() => { move(3, 1, speed / 100); speed += acceleration * 0.01; }, 10);

    let angle = 30;
    setInterval(() => { rotate(4, angle / 200); }, 5);
    document.getElementById('angle').addEventListener('change', (e) => { angle = e.target.value; }, false);

    zvelx = 0;
    zvely = 4;
    function thinkname2() {
        const [mydis, myang] = toPolar(ballx[4], bally[4]);
        const accer = -600 / mydis / mydis;
        const accerx = accer * Math.cos(myang);
        const accery = accer * Math.sin(myang);
        zvelx += accerx;
        zvely += accery;
        zmove(5, zvelx, zvely);
    }

    setInterval(thinkname2, 1);
});