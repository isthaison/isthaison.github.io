const a0_0x32772b=a0_0x4887;(function(_0x17bf25,_0x336be3){const _0x389033=a0_0x4887,_0x37ac43=_0x17bf25();while(!![]){try{const _0x17a255=-parseInt(_0x389033(0x17d))/0x1*(-parseInt(_0x389033(0x14e))/0x2)+parseInt(_0x389033(0x198))/0x3*(parseInt(_0x389033(0x163))/0x4)+-parseInt(_0x389033(0x1b5))/0x5+parseInt(_0x389033(0x177))/0x6+parseInt(_0x389033(0x16d))/0x7*(parseInt(_0x389033(0x17b))/0x8)+-parseInt(_0x389033(0x173))/0x9+parseInt(_0x389033(0x199))/0xa*(-parseInt(_0x389033(0x197))/0xb);if(_0x17a255===_0x336be3)break;else _0x37ac43['push'](_0x37ac43['shift']());}catch(_0x25c523){_0x37ac43['push'](_0x37ac43['shift']());}}}(a0_0x3f13,0x1eded));const canvas=document['getElementById'](a0_0x32772b(0x157)),ctx=canvas[a0_0x32772b(0x1a6)]('2d');canvas['width']=window[a0_0x32772b(0x155)],canvas[a0_0x32772b(0x150)]=window[a0_0x32772b(0x192)];const FONTFAMILY=a0_0x32772b(0x170);let touchCount=parseFloat(localStorage[a0_0x32772b(0x1a5)](a0_0x32772b(0x15e)))||0x0,angle=0x0;const BASE_PATH=self[a0_0x32772b(0x146)][a0_0x32772b(0x183)]['replace'](/\/$/,''),MAX=0x3b9ac9ff;function debounce(_0x22719d,_0x46d83c){let _0x580acc;return function(..._0x213ca8){clearTimeout(_0x580acc),_0x580acc=setTimeout(()=>{const _0x358537=a0_0x4887;_0x22719d[_0x358537(0x19b)](this,_0x213ca8);},_0x46d83c);};}const music=document[a0_0x32772b(0x17c)](a0_0x32772b(0x1b9));music[a0_0x32772b(0x179)]=0.5;const tetDate=new Date(a0_0x32772b(0x15c));let fireworks=[],stars=[];function updateFontSize(){const _0x23510d=a0_0x32772b,_0x16ac6a=canvas[_0x23510d(0x17e)],_0x2c5de3=canvas[_0x23510d(0x150)],_0x423df5=Math[_0x23510d(0x164)](_0x16ac6a/0x780,_0x2c5de3/0x438),_0x11edef=0x46*_0x423df5;return _0x11edef;}for(let i=0x0;i<0xc8;i++){stars[a0_0x32772b(0x1c9)]({'x':Math[a0_0x32772b(0x16a)]()*canvas['width'],'y':Math[a0_0x32772b(0x16a)]()*canvas[a0_0x32772b(0x150)],'radius':Math[a0_0x32772b(0x16a)]()*0x2,'alpha':Math[a0_0x32772b(0x16a)](),'speed':Math['random']()*0.02});}function drawStars(){stars['forEach'](_0xfbcd2e=>{const _0x3e9496=a0_0x4887;_0xfbcd2e[_0x3e9496(0x178)]+=_0xfbcd2e[_0x3e9496(0x18f)];if(_0xfbcd2e['alpha']>0x1||_0xfbcd2e['alpha']<0x0)_0xfbcd2e[_0x3e9496(0x18f)]*=-0x1;ctx[_0x3e9496(0x145)](),ctx[_0x3e9496(0x1b7)](_0xfbcd2e['x'],_0xfbcd2e['y'],_0xfbcd2e[_0x3e9496(0x172)],0x0,Math['PI']*0x2),ctx['fillStyle']=_0x3e9496(0x188)+_0xfbcd2e['alpha']+')',ctx[_0x3e9496(0x1bb)]();});}function wrapText(_0x2d312c,_0x16c634,_0x2a5e5c,_0x40f525,_0x2ae4f1,_0x2bd786){const _0x611f33=a0_0x32772b,_0xe8fc79=_0x16c634[_0x611f33(0x191)]('\x20');let _0x56a816='',_0x1ba76e=[];_0xe8fc79[_0x611f33(0x14c)](_0x4077ce=>{const _0x2d57a3=_0x611f33,_0x356092=_0x56a816+_0x4077ce+'\x20',_0x369574=_0x2d312c[_0x2d57a3(0x154)](_0x356092),_0x2a08c1=_0x369574[_0x2d57a3(0x17e)];_0x2a08c1>_0x2ae4f1&&_0x56a816!==''?(_0x1ba76e[_0x2d57a3(0x1c9)](_0x56a816),_0x56a816=_0x4077ce+'\x20'):_0x56a816=_0x356092;}),_0x1ba76e[_0x611f33(0x1c9)](_0x56a816),_0x1ba76e[_0x611f33(0x14c)]((_0x143ddc,_0xce9933)=>{const _0x3261f4=_0x611f33;_0x2d312c[_0x3261f4(0x176)](_0x143ddc,_0x2a5e5c,_0x40f525+_0xce9933*_0x2bd786);});}function drawCountdown(){const _0x49b2e1=a0_0x32772b,_0xde64a2=new Date(),_0x57dd53=tetDate-_0xde64a2,_0x3f2bcf='🎉\x20Chúc\x20Mừng\x20Năm\x20Mới!\x20🎉\x202025';if(_0x57dd53<=0x0||0x1==0x1){drawFireworks(),ctx[_0x49b2e1(0x16b)]=_0x49b2e1(0x1ac),ctx[_0x49b2e1(0x1c5)]=_0x49b2e1(0x1c6)+updateFontSize()+'px\x20'+FONTFAMILY,ctx[_0x49b2e1(0x14f)]=_0x49b2e1(0x185),ctx['fillText'](_0x3f2bcf,canvas[_0x49b2e1(0x17e)]/0x2,canvas[_0x49b2e1(0x150)]/0x2),ctx[_0x49b2e1(0x1c5)]='bold\x2012px\x20'+FONTFAMILY,wrapText(ctx,_0x49b2e1(0x19d)+touchCount+_0x49b2e1(0x169),canvas['width']/0x2,canvas[_0x49b2e1(0x150)]/0x2+Math[_0x49b2e1(0x182)](updateFontSize(),0xc),canvas[_0x49b2e1(0x17e)]*0.8,0xe),drawGift(ctx,canvas[_0x49b2e1(0x17e)]/0x2,0x64);let _0x5a97e2;if(touchCount>=0x4e20)_0x5a97e2=_0x49b2e1(0x167);else{if(touchCount>=0x2710)_0x5a97e2='Đây\x20là\x20của\x20bạn\x20🎁\x20size\x20XL!\x20Một\x20món\x20quà\x20tuyệt\x20vời!';else{if(touchCount>=0x1388)_0x5a97e2='Đây\x20là\x20của\x20bạn\x20🎁\x20size\x20L!\x20Chúc\x20mừng\x20bạn!';else touchCount>=0x3e8?_0x5a97e2=_0x49b2e1(0x149):_0x5a97e2=_0x49b2e1(0x1c2);}}ctx[_0x49b2e1(0x1c5)]=_0x49b2e1(0x159)+FONTFAMILY,ctx['textAlign']=_0x49b2e1(0x185),ctx['fillText'](_0x5a97e2,canvas['width']/0x2,0xb4);return;}const _0x482e49=updateFontSize(),_0x1f593e=Math['floor'](_0x57dd53/(0x3e8*0x3c*0x3c*0x18)),_0x7287c3=Math['floor'](_0x57dd53/(0x3e8*0x3c*0x3c)%0x18),_0x1e6abe=Math[_0x49b2e1(0x19f)](_0x57dd53/(0x3e8*0x3c)%0x3c),_0x9226ea=Math[_0x49b2e1(0x19f)](_0x57dd53/0x3e8%0x3c),_0x218824=_0x1f593e+_0x49b2e1(0x174)+_0x7287c3+'\x20Giờ\x20'+_0x1e6abe+_0x49b2e1(0x1b8)+_0x9226ea+_0x49b2e1(0x158),_0x12203f=_0x49b2e1(0x156);ctx['fillStyle']='yellow',ctx[_0x49b2e1(0x1c5)]=_0x49b2e1(0x1c6)+_0x482e49+_0x49b2e1(0x1b4)+FONTFAMILY,ctx['textAlign']=_0x49b2e1(0x185),ctx[_0x49b2e1(0x176)](_0x12203f,canvas[_0x49b2e1(0x17e)]/0x2,canvas[_0x49b2e1(0x150)]/0x2-0x64),ctx[_0x49b2e1(0x1c5)]='bold\x20'+_0x482e49*1.4+_0x49b2e1(0x1b4)+FONTFAMILY,ctx[_0x49b2e1(0x16b)]=_0x49b2e1(0x1ac),ctx['fillText'](_0x218824,canvas[_0x49b2e1(0x17e)]/0x2,canvas['height']/0x2);}function createFireworks(_0x33fe6c,_0x41295d){const _0x5bba6b=a0_0x32772b;let _0x17b339='hsl('+Math[_0x5bba6b(0x16a)]()*0x168+_0x5bba6b(0x1c3),_0x2e9fde=[];for(let _0x21536a=0x0;_0x21536a<0x32;_0x21536a++){_0x2e9fde[_0x5bba6b(0x1c9)]({'x':_0x33fe6c,'y':_0x41295d,'radius':Math[_0x5bba6b(0x16a)]()*0x2+0x1,'angle':Math[_0x5bba6b(0x16a)]()*Math['PI']*0x2,'speed':Math[_0x5bba6b(0x16a)]()*0x4+0x2,'decay':Math['random']()*0.05+0.01,'colors':_0x17b339});}fireworks[_0x5bba6b(0x1c9)]({'sparkles':_0x2e9fde});}function drawFireworks(){const _0xefebb3=a0_0x32772b;fireworks[_0xefebb3(0x14c)]((_0x24042f,_0x34efad)=>{const _0x4ae261=_0xefebb3;_0x24042f[_0x4ae261(0x1bd)][_0x4ae261(0x14c)]((_0x4fbe48,_0x5b681b)=>{const _0x10b1bd=_0x4ae261;_0x4fbe48['x']+=Math[_0x10b1bd(0x1a4)](_0x4fbe48[_0x10b1bd(0x19e)])*_0x4fbe48['speed'],_0x4fbe48['y']+=Math[_0x10b1bd(0x141)](_0x4fbe48[_0x10b1bd(0x19e)])*_0x4fbe48[_0x10b1bd(0x18f)],_0x4fbe48[_0x10b1bd(0x172)]=Math[_0x10b1bd(0x182)](_0x4fbe48[_0x10b1bd(0x172)]-_0x4fbe48[_0x10b1bd(0x160)],0x0),_0x4fbe48[_0x10b1bd(0x172)]>0x0?(ctx['beginPath'](),ctx['arc'](_0x4fbe48['x'],_0x4fbe48['y'],_0x4fbe48[_0x10b1bd(0x172)],0x0,Math['PI']*0x2),ctx[_0x10b1bd(0x16b)]=_0x4fbe48[_0x10b1bd(0x190)],ctx[_0x10b1bd(0x1bb)]()):_0x24042f['sparkles'][_0x10b1bd(0x171)](_0x5b681b,0x1);});if(_0x24042f[_0x4ae261(0x1bd)][_0x4ae261(0x187)]===0x0)fireworks['splice'](_0x34efad,0x1);});}function createRandomFireworks(){const _0x2d6bdb=a0_0x32772b,_0x1c22d0=Math[_0x2d6bdb(0x16a)]()*canvas['width'],_0x3a8fe3=canvas[_0x2d6bdb(0x150)];createFireworks(_0x1c22d0,_0x3a8fe3);}function startMusic(){const _0x449c07=a0_0x32772b;musicIcon[_0x449c07(0x19c)][_0x449c07(0x1ab)](_0x449c07(0x193)),music[_0x449c07(0x15d)]()[_0x449c07(0x16e)](_0x2a5fec=>console[_0x449c07(0x1ba)](_0x449c07(0x15b),_0x2a5fec));}function onInputChange(_0x2d849a){const _0x1959ce=a0_0x32772b;console[_0x1959ce(0x1ba)]('Input\x20value:',_0x2d849a[_0x1959ce(0x144)][_0x1959ce(0x16c)]);}const increaseTouchCount=debounce(()=>{const _0x23479d=a0_0x32772b;localStorage[_0x23479d(0x1a9)]('touchCount',touchCount);},0xc8);function a0_0x4887(_0x5d3e79,_0x3eca1c){const _0x3f1344=a0_0x3f13();return a0_0x4887=function(_0x48878e,_0xa006a1){_0x48878e=_0x48878e-0x140;let _0x4ba5c7=_0x3f1344[_0x48878e];return _0x4ba5c7;},a0_0x4887(_0x5d3e79,_0x3eca1c);}canvas[a0_0x32772b(0x152)]('click',_0x3e9b74=>{const _0x3f1d7d=a0_0x32772b,_0x356d70=canvas[_0x3f1d7d(0x19a)]();createFireworks(_0x3e9b74[_0x3f1d7d(0x18b)]-_0x356d70[_0x3f1d7d(0x1b0)],_0x3e9b74[_0x3f1d7d(0x196)]-_0x356d70[_0x3f1d7d(0x143)]),touchCount++,increaseTouchCount();});function drawTouchCount(){const _0x17148d=a0_0x32772b;ctx[_0x17148d(0x1c5)]=_0x17148d(0x181)+FONTFAMILY,ctx[_0x17148d(0x16b)]=_0x17148d(0x1ac),ctx['textAlign']='left',ctx[_0x17148d(0x176)](_0x17148d(0x1c0)+touchCount,0x14,0x32);}function a0_0x3f13(){const _0x2d04a7=['decay','matchMedia','20px','140QCjyub','min','userAgent','ctrlKey','Đây\x20là\x20của\x20bạn\x20🎁\x20size\x20XXXL\x20với\x20giải\x20thưởng\x20xứng\x20đáng!','accepted','\x20lần.\x20Thật\x20là\x20dữ\x20dội✨✨🌸🎉🌸✨🎉🎉🎉🌸🎉🎉🌸🎉Chúc\x20bạn\x20và\x20gia\x20đình\x20một\x20năm\x20mới\x20tràn\x20ngập\x20niềm\x20vui\x20và\x20hạnh\x20phúc!\x20Mong\x20rằng\x20mọi\x20điều\x20bạn\x20mơ\x20ước\x20sẽ\x20trở\x20thành\x20hiện\x20thực,\x20mọi\x20khó\x20khăn\x20chỉ\x20là\x20những\x20câu\x20chuyện\x20đã\x20qua.\x20Hãy\x20luôn\x20cười\x20thật\x20tươi\x20và\x20tràn\x20đầy\x20năng\x20lượng\x20trong\x20năm\x20mới\x20này\x20nhé!\x20Chúc\x20bạn\x20một\x20năm\x20mới\x20an\x20khang,\x20thịnh\x20vượng,\x20và\x20thật\x20nhiều\x20yêu\x20thương!🌸🎉🌸🎉🌸🎉🌸🎉✨✨🌸🎉🌸🎉','random','fillStyle','value','21ZxNpDy','catch','load','Courier\x20New,\x20Courier,\x20monospace','splice','radius','81324eGLrwm','\x20Ngày\x20','beforeinstallprompt','fillText','1393980lLVFeo','alpha','volume','(display-mode:\x20standalone)','592512NUEeSf','getElementById','2bMbfmR','width','Xem\x20mã\x20nguồn\x20đã\x20bị\x20vô\x20hiệu\x20hóa!','mobile-install','bold\x2012px\x20','max','pathname','then','center','textContent','length','rgba(255,\x20255,\x20255,\x20','contextmenu','href','clientX','zIndex','style','navigator','speed','colors','split','innerHeight','active','position','remove','clientY','11gvpTKF','20583bXAKOy','5652590VeZMLH','getBoundingClientRect','apply','classList','Bạn\x20đã\x20chạm\x20','angle','floor','appendChild','shiftKey','Notification','textBaseline','cos','getItem','getContext','User\x20dismissed\x20the\x20install\x20prompt','serviceWorker','setItem','preventDefault','add','white','matches','clearRect','resize','left','Chức\x20năng\x20chuột\x20phải\x20đã\x20bị\x20vô\x20hiệu\x20hóa!','Cài\x20đặt','body','px\x20','845095LxmDbV','standalone','arc','\x20Phút\x20','backgroundMusic','log','fill','click','sparkles','right','includes','Điểm\x20số\x20của\x20bạn:\x20','about:blank','Đây\x20là\x20của\x20bạn\x20🎁\x20size\x20S!\x20Cố\x20gắng\x20hơn\x20nữa!',',\x20100%,\x2050%)','userChoice','font','bold\x20','key','register','push','pause','Developer\x20Tools\x20đang\x20mở!','/tet','sin','defineProperty','top','target','beginPath','location','prompt','/service-worker.js','Đây\x20là\x20của\x20bạn\x20🎁\x20size\x20M!\x20Một\x20món\x20quà\x20nhỏ\x20thôi!','1000','fixed','forEach','Mobi','175102QMqjHO','textAlign','height','Desktop\x20or\x20Tablet\x20form\x20factor\x20detected.','addEventListener','button','measureText','innerWidth','🎉\x20Tết\x20Nguyên\x20Đán\x202025\x20🎉','countdownCanvas','\x20Giây','16px\x20','Developer\x20Tools\x20đã\x20bị\x20vô\x20hiệu\x20hóa!','Nhạc\x20nền\x20không\x20tự\x20phát\x20do\x20giới\x20hạn\x20trình\x20duyệt.','2025-02-10T00:00:00','play','touchCount','keydown'];a0_0x3f13=function(){return _0x2d04a7;};return a0_0x3f13();}function animate(){const _0x39542e=a0_0x32772b;ctx[_0x39542e(0x1ae)](0x0,0x0,canvas['width'],canvas['height']),drawStars(),drawCountdown(),drawFireworks(),drawTouchCount(),requestAnimationFrame(animate);}setInterval(createRandomFireworks,Math['random']()*0x3e8+0x3e8),canvas[a0_0x32772b(0x17e)]=window[a0_0x32772b(0x155)],canvas['height']=window[a0_0x32772b(0x192)],animate(),window[a0_0x32772b(0x152)](a0_0x32772b(0x1af),()=>{const _0x1b3bba=a0_0x32772b;canvas[_0x1b3bba(0x17e)]=window[_0x1b3bba(0x155)],canvas[_0x1b3bba(0x150)]=window[_0x1b3bba(0x192)];}),window[a0_0x32772b(0x152)]('click',startMusic,{'once':!![]});let isMusicPlaying=![];musicIcon[a0_0x32772b(0x152)]('click',()=>{const _0x1ffeb3=a0_0x32772b;isMusicPlaying?(music[_0x1ffeb3(0x1ca)](),musicIcon[_0x1ffeb3(0x19c)][_0x1ffeb3(0x195)](_0x1ffeb3(0x193))):(music['play'](),musicIcon[_0x1ffeb3(0x19c)][_0x1ffeb3(0x1ab)](_0x1ffeb3(0x193))),isMusicPlaying=!isMusicPlaying;});function getGiftSize(_0x7dffe2){if(_0x7dffe2>=0x4e20)return 0x96;if(_0x7dffe2>=0x2710)return 0x78;if(_0x7dffe2>=0x1388)return 0x5a;if(_0x7dffe2>=0x3e8)return 0x46;if(_0x7dffe2>=0x64)return 0x32;return 0x1e;}function drawGift(_0x5d3177,_0x54d87c,_0x3589d7){const _0x2f0b24=a0_0x32772b,_0xaa4a07=getGiftSize(touchCount),_0x27d87f=Math[_0x2f0b24(0x141)](angle)*0x5,_0x1ef8c4=Math[_0x2f0b24(0x1a4)](angle)*0x2;_0x5d3177['font']=_0xaa4a07+'px\x20Arial',_0x5d3177[_0x2f0b24(0x14f)]='center',_0x5d3177[_0x2f0b24(0x1a3)]=_0x2f0b24(0x143),_0x5d3177['fillText']('🎁',_0x54d87c+_0x27d87f,_0x3589d7+_0x1ef8c4),angle+=0.1;}navigator[a0_0x32772b(0x165)][a0_0x32772b(0x1bf)](a0_0x32772b(0x14d))?(console[a0_0x32772b(0x1ba)]('Mobile\x20form\x20factor\x20detected.'),document[a0_0x32772b(0x1b3)][a0_0x32772b(0x19c)][a0_0x32772b(0x1ab)](a0_0x32772b(0x180))):(console['log'](a0_0x32772b(0x151)),document['body'][a0_0x32772b(0x19c)]['add']('desktop-install'));if('serviceWorker'in navigator&&a0_0x32772b(0x1a2)in window){function showInstallPrompt(){const _0x5a25e7=a0_0x32772b;window[_0x5a25e7(0x152)](_0x5a25e7(0x175),_0x127a43=>{const _0x23a5f6=_0x5a25e7;_0x127a43[_0x23a5f6(0x1aa)]();let _0x3e29e1=_0x127a43;const _0x1df634=document['createElement'](_0x23a5f6(0x153));_0x1df634[_0x23a5f6(0x186)]=_0x23a5f6(0x1b2),_0x1df634[_0x23a5f6(0x18d)][_0x23a5f6(0x194)]=_0x23a5f6(0x14b),_0x1df634['style']['bottom']='20px',_0x1df634[_0x23a5f6(0x18d)][_0x23a5f6(0x1be)]=_0x23a5f6(0x162),_0x1df634[_0x23a5f6(0x18d)][_0x23a5f6(0x18c)]=_0x23a5f6(0x14a),_0x1df634[_0x23a5f6(0x152)](_0x23a5f6(0x1bc),()=>{const _0x4fa1f7=_0x23a5f6;_0x3e29e1[_0x4fa1f7(0x147)](),_0x3e29e1[_0x4fa1f7(0x1c4)][_0x4fa1f7(0x184)](_0x2686eb=>{const _0x2621ea=_0x4fa1f7;_0x2686eb['outcome']===_0x2621ea(0x168)?console['log']('User\x20accepted\x20the\x20install\x20prompt'):console[_0x2621ea(0x1ba)](_0x2621ea(0x1a7)),_0x3e29e1=null;});}),document['body'][_0x23a5f6(0x1a0)](_0x1df634);}),window[_0x5a25e7(0x161)](_0x5a25e7(0x17a))[_0x5a25e7(0x1ad)]&&(window[_0x5a25e7(0x146)][_0x5a25e7(0x18a)]=_0x5a25e7(0x140));}console[a0_0x32772b(0x1ba)](BASE_PATH),window[a0_0x32772b(0x152)](a0_0x32772b(0x16f),()=>{const _0x596ce1=a0_0x32772b;navigator[_0x596ce1(0x1a8)][_0x596ce1(0x1c8)](BASE_PATH+_0x596ce1(0x148))[_0x596ce1(0x184)](_0x1f611a=>{const _0x450b0f=_0x596ce1;if(window['matchMedia'](_0x450b0f(0x17a))[_0x450b0f(0x1ad)])return;window[_0x450b0f(0x18e)][_0x450b0f(0x1b6)]===undefined&&showInstallPrompt();});});}document[a0_0x32772b(0x152)](a0_0x32772b(0x15f),_0xe45463=>{const _0xc0fac3=a0_0x32772b;_0xe45463[_0xc0fac3(0x1c7)]==='F12'&&(_0xe45463['preventDefault'](),alert(_0xc0fac3(0x15a))),(_0xe45463[_0xc0fac3(0x166)]||_0xe45463['metaKey'])&&_0xe45463[_0xc0fac3(0x1a1)]&&_0xe45463['key']==='I'&&(_0xe45463[_0xc0fac3(0x1aa)](),alert(_0xc0fac3(0x15a))),(_0xe45463[_0xc0fac3(0x166)]||_0xe45463['metaKey'])&&_0xe45463[_0xc0fac3(0x1c7)]==='U'&&(_0xe45463[_0xc0fac3(0x1aa)](),alert(_0xc0fac3(0x17f))),(_0xe45463[_0xc0fac3(0x166)]||_0xe45463['metaKey'])&&_0xe45463['shiftKey']&&_0xe45463['key']==='J'&&(_0xe45463[_0xc0fac3(0x1aa)](),alert('Developer\x20Tools\x20đã\x20bị\x20vô\x20hiệu\x20hóa!')),(_0xe45463['ctrlKey']||_0xe45463['metaKey'])&&_0xe45463[_0xc0fac3(0x1a1)]&&_0xe45463[_0xc0fac3(0x1c7)]==='C'&&(_0xe45463[_0xc0fac3(0x1aa)](),alert(_0xc0fac3(0x15a)));}),document[a0_0x32772b(0x152)](a0_0x32772b(0x189),_0x18a188=>{const _0x2acecf=a0_0x32772b;_0x18a188[_0x2acecf(0x1aa)](),alert(_0x2acecf(0x1b1));}),(function(){const _0xdfd6f1=a0_0x32772b,_0x26b2d3=new Image();Object[_0xdfd6f1(0x142)](_0x26b2d3,'id',{'get':function(){const _0x4d2499=_0xdfd6f1;alert(_0x4d2499(0x1cb)),window['location'][_0x4d2499(0x18a)]=_0x4d2499(0x1c1);}}),console[_0xdfd6f1(0x1ba)](_0x26b2d3);}());