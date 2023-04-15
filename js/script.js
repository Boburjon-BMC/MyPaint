window.addEventListener('DOMContentLoaded', () =>{
        'use strict';

        const file_ViewBtn = document.querySelectorAll('.fileBtnClick'),
                  menu__wrap = document.querySelector('.menu__wrap'),
                  fileBarClose = document.querySelector('.fileBarClose'),
                  fileBarCloseLI = document.querySelectorAll('.fileBarClose ul li'),
                  ViewBarClose = document.querySelector('.ViewBarClose'),
                  ViewBarCloseLI = document.querySelectorAll('.ViewBarClose  ul  li'),
                  mausXY = document.querySelector('.mausXY'),
                  canvas = document.querySelector('.canvas'),
                  canvasXY = document.querySelector('.canvasX'),
                  rangeBottom = document.querySelector('.rangeBottom'),
                  foiz = document.querySelector('.foiz'),
                  btnSiZe = document.querySelector('.btnSiZe'),
                  closeSize = document.querySelector('.sizeClose'),
                  sizeBtnLI = document.querySelectorAll('.sizeBtnLI'),
                  toolBtn  = document.querySelectorAll('.tool'),
                  color_items = document.querySelectorAll('.color_items'),
                  color_item = document.querySelector('.color_item'),
                  fillColor = document.querySelector('.fillColor'),
                  BottomBar = document.querySelector('.BottomBar'),
                  modalWindow = document.querySelector('.modalWindow'),
                  farmat = document.querySelector('.farmat'),
                  farmatP = document.querySelectorAll('.farmat p'),
                  floppyBtn = document.querySelectorAll('.floppyBtn'),
                  menyuText = document.querySelector('.menyuText'),
                  textBtn = document.querySelector('#text'),
                  deleticon = document.querySelector('.deleticon')

                let SizeW = 2;
                let COLOR = color_item.style;

                color_items.forEach(element =>{
                        element.addEventListener('click',(e)=>{
                                COLOR.backgroundColor = e.target.style.backgroundColor;
                        });
                });

                // delet
                deleticon.addEventListener('click', (e)=>{
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                });


                sizeBtnLI.forEach((item, index)=>{
                        item.addEventListener('click', (e)=>{
                                if(index ==0){
                                        SizeW = 3;
                                        closeSize.classList.remove('show');
                                }else if(index == 1){
                                        SizeW = 5;
                                        closeSize.classList.remove('show');
                                }else if(index == 2){
                                        SizeW = 7;
                                        closeSize.classList.remove('show');
                                }else if(index == 3){
                                        SizeW = 11
                                        closeSize.classList.remove('show');
                                }
                        });
                });

                //   sizeBtn
                btnSiZe.addEventListener('click',function(){
                        closeSize.classList.toggle('show');
                });

                //   topbar
                  menu__wrap.addEventListener('click', (element)=>{
                        const target = element.target;
                        if(target && target.classList.contains('ViewBtn')){
                                file_ViewBtn.forEach(element => {
                                        if(target == element){
                                                ViewBarClose.classList.toggle('fileShow');        
                                                fileBarClose.classList.remove('fileShow')
                                        }
                                });
                        }
                        else {
                                file_ViewBtn.forEach(element => {
                                        if(target == element){
                                                fileBarClose.classList.toggle('fileShow');
                                                ViewBarClose.classList.remove('fileShow')    
                                        }
                                });
                        }
                });

                // moueXY
                function canvasHover(e){
                        mausXY.innerHTML = `${e.layerX - 20} x ${e.layerY - 20}`
                }
                canvas.addEventListener('mousemove', canvasHover);
                
                // canvasXY
                setInterval((e) => {
                        let canvasWidth = canvas.clientWidth;
                        let canvasHeight = canvas.clientHeight;        
                        canvasXY.innerHTML = `${canvasWidth} x ${canvasHeight}`;
                }, 1000);

                function rangeChenge(){
                        let num= parseFloat( rangeBottom.value)
                        foiz.innerHTML = `${num}%`;
                        canvas.style.height = `${num}%`;                        
                        canvas.style.width = `${num}%`;                        
                }
                rangeBottom.addEventListener('change', rangeChenge);

                ViewBarCloseLI.forEach((item, index)=>{
                        item.addEventListener('click',(e)=>{
                                let num2 = parseInt(rangeBottom.value)
                                if(index == 0){
                                        ViewBarClose.classList.remove('fileShow');
                                        if(num2 > 100 || num2 < 100){
                                                foiz.innerHTML = `100%`;
                                                canvas.style.height = `${100}%`;                        
                                                canvas.style.width = `${99}%`;
                                        }
                                }else if(index == 1){
                                        ViewBarClose.classList.remove('fileShow');
                                        BottomBar.classList.toggle('hide');
                                }

                        });
                });

                modalWindow.addEventListener('click',(e)=>{
                        let target  = e.target;
                        if(target.classList.contains('modalexit')){
                                modalWindow.classList.add('hide')
                        }else if(target.classList.contains('not') ){
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                                modalWindow.classList.add('hide');
                        }else if(target.classList.contains('Save')){
                                modalWindow.classList.add('hide');
                                SetColorbackground();

                        }
                });

                fileBarCloseLI.forEach((item, index)=>{
                        item.addEventListener('click', (e)=>{
                                if(index == 0){
                                        fileBarClose.classList.remove('fileShow');
                                        if(prevMoueX == null && prevMoueY == null){
                                                console.log("Canvasda malumot yoq");
                                        }
                                        else{
                                                modalWindow.classList.remove('hide');
                                        }
                                }
                                else if(index == 1){
                                        fileBarClose.classList.remove('fileShow');
                                        
                                }
                                else if(index == 2){
                                        farmat.classList.remove('hide');
                                }
                        } );
                });

                let ctx = canvas.getContext('2d');
                let isDrowing = false;
                let selectrColor = COLOR;
                let selectedTool = 'pen'; 
                let prevMoueX;
                let prevMoueY;
                let snapshot;
                let tip =' jpg';

                const SetColorbackground =() =>{
                        ctx.fillStyle = '#fff';
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                        ctx.fillStyle = selectrColor;
                    };

                window.addEventListener("load", ()=>{
                        canvas.width = canvas.offsetWidth;
                        canvas.height = canvas.offsetHeight;
                        SetColorbackground();

                });

                farmatP.forEach((item, index) =>{
                        item.addEventListener('click', e=>{
                        farmat.classList.add('hide');
                        fileBarClose.classList.remove('fileShow');
                                if(index == 0){
                                        tip = 'png';
                                }
                                else if(index == 1){
                                        tip = 'jpg'
                                }
                                else if(index == 2){
                                        tip = 'bmp'
                                }
                        });
                    });

                    floppyBtn.forEach(e =>{
                        e.addEventListener('click', ()=>{
                                const link = document.createElement('a');
                                link.download = `MyPaint ${Date.now()}.${tip}`;
                                link.href = canvas.toDataURL();
                                link.click()

                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                        });
                    })

                // Drawing
                const Drawing = (e)=>{
                        if(!isDrowing) return
                        ctx.putImageData(snapshot, 0 ,0 )
                        switch (selectedTool) {
                                case 'pen':
                                        ctx.lineTo(e.offsetX, e.offsetY);
                                        ctx.stroke();
                                        break;
                                case 'torburchak2':
                                        drowrectangle(e);
                                       break; 
                                case 'aylana':
                                        drawcircle(e);
                                        break;
                                case 'uchburchak':
                                        drowTriangle(e);
                                        break;
                                case 'togriuchburchak':
                                        drowTrueRectangle(e);
                                        break;
                                case 'line':
                                        line(e);
                                        break;
                                case 'torburchak':
                                        torburchak(e);
                                        break;
                                case 'ochir':
                                        ctx.strokeStyle = '#fff';
                                        ctx.lineTo(e.offsetX, e.offsetY);
                                        ctx.stroke();
                                        break;
                                case 'chizish':
                                        linePen(e);
                                        break;
                                case 'text':
                                       text(e);
                                        break;
                        }
                }
                const Startdraw = (e)=>{
                        isDrowing = true;
                        ctx.beginPath();
                        prevMoueX = e.offsetX;
                        prevMoueY = e.offsetY;
                        ctx.lineWidth = SizeW;
                        ctx.strokeStyle = COLOR.backgroundColor;
                        ctx.fillStyle = COLOR.backgroundColor;
                        snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);

                };

                const Stopdrow =(e)=>{
                        isDrowing = false;
                };

                // drowrectangle
                const drowrectangle = (e) =>{
                        if (!fillColor.classList.contains('active')) {
                                return   ctx.strokeRect(e.offsetX, e.offsetY, prevMoueX - e.offsetX, prevMoueY - e.offsetY);
                        }
                        else {
                                ctx.fillRect(e.offsetX, e.offsetY, prevMoueX - e.offsetX, prevMoueY - e.offsetY);
                        }
                }
                // torburchak1
                function torburchak (e){
                        ctx.beginPath();
                        ctx.roundRect(e.offsetX, e.offsetY,  prevMoueX - e.offsetX, prevMoueY - e.offsetY, [10]);
                        ctx.stroke();
                        fillColor.classList.contains('active') ? ctx.fill() : ctx.stroke();
                }

                // drawcircle
                const drawcircle = (e) =>{
                        ctx.beginPath();
                        const radius = Math.sqrt(Math.pow((prevMoueX - e.offsetX), 2)) +Math.pow((prevMoueY - e.offsetY), 2)
                        ctx.arc(prevMoueX, prevMoueY, radius, 0 ,  2 * Math.PI);
                        fillColor.classList.contains('active') ? ctx.fill() : ctx.stroke();
                }
                // uchburchak
                const drowTriangle = (e) =>{
                        ctx.beginPath();
                        ctx.moveTo(prevMoueX, prevMoueY);
                        ctx.lineTo(e.offsetX, e.offsetY);
                        ctx.lineTo(prevMoueX * 2 - e.offsetX, e.offsetY);
                        ctx.closePath();
                        ctx.stroke(); 
                        fillColor.classList.contains('active') ? ctx.fill() : ctx.stroke();
                }

                const fontSave = document.querySelector('.fontSave');
                const textinputClass = document.querySelector('.textinputClass');
                const fontfamily = document.querySelector('#fontfamily');
                const fontsize = document.querySelector('#fontsize');
                const btnFont = document.querySelectorAll('.btnFont');
                const btnFontBold = document.querySelector('.btnFont1');
                const btnFontItalic = document.querySelector('.btnFont2');

                let inputValue = '';
                let fontFamily;
                let fontSize = 18;
                let fontBold;
                let fontItalic;

                btnFont.forEach((item, index) =>{
                        item.addEventListener('click', ()=>{
                                item.classList.toggle('active')
                        });
                });
                fontSave.addEventListener('click', ()=>{
                        if(textinputClass.value != ''){
                                inputValue = textinputClass.value;
                        }
                        else{
                                inputValue = ' '
                                textinputClass.style.border =  '1px solid red';
                                textinputClass.style.color  = 'red';
                        }
                        btnFontBold.classList.contains('active') ? fontBold = 'bold' : fontBold = ' ';
                        btnFontItalic.classList.contains('active') ? fontItalic = 'italic' : fontItalic = ' ';
                        
                });

                fontfamily.addEventListener('click', (e) =>{
                        const target = e.target;
                        fontFamily = target.textContent;
                });
                fontsize.addEventListener('click', (e)=>{
                        const target = e.target;
                        fontSize = target.textContent;
                });
                // text
                const text = (e) =>{
                        ctx.font = `${fontItalic} ${fontBold} ${fontSize}px ${fontFamily}`;
                        ctx.fillText(`${inputValue}`, e.offsetX, e.offsetY);
                }
                textBtn.addEventListener('click', () =>{ menyuText.classList.remove('hide');});

                // togriburchakli uchburchak
                function drowTrueRectangle(e){
                        ctx.beginPath();
                        ctx.moveTo(prevMoueX, prevMoueY);
                        ctx.lineTo(e.offsetX, e.offsetY);
                        ctx.lineTo(prevMoueX - e.offsetX / 6, e.offsetY);
                        ctx.closePath();
                        ctx.stroke(); 
                        fillColor.classList.contains('active') ? ctx.fill() : ctx.stroke();
                }
                // line
                const line = (e) =>{
                        ctx.beginPath();
                        ctx.moveTo(prevMoueX, prevMoueY);
                        ctx.lineTo(e.offsetX, e.offsetY);
                        ctx.stroke(); 
                } ;

                // linePen
                function linePen(e){
                        ctx.lineTo(e.offsetX, e.offsetY)
                        ctx.stroke();
                        ctx.lineWidth = 5;
                }


                toolBtn.forEach((btn, index) =>{
                        btn.addEventListener('click', ()=>{
                                document.querySelector('.AAAA .active').classList.remove('active');
                                btn.classList.add('active');
                                console.log(btn.id);
                                selectedTool = btn.id; 
                                if(index == 1){
                                        menyuText.classList.remove('hide');
                                }
                                else{
                                        menyuText.classList.add('hide')
                                }
                                
                        });
                });
                const fillColorBtn = (e)=>{
                        fillColor.classList.toggle('active')
                };
                fillColor.addEventListener('click', fillColorBtn);
                canvas.addEventListener('mousedown', Startdraw);
                canvas.addEventListener('mousemove', Drawing);
                canvas.addEventListener('mouseup',Stopdrow);


                
        const pickr = Pickr.create({
        el: '.color-picker',
        theme: 'classic', // or 'monolith', or 'nano'
    
        swatches: [
            'rgba(244, 67, 54, 1)',
            'rgba(233, 30, 99, 0.95)',
            'rgba(156, 39, 176, 0.9)',
            'rgba(103, 58, 183, 0.85)',
            'rgba(63, 81, 181, 0.8)',
            'rgba(33, 150, 243, 0.75)',
            'rgba(3, 169, 244, 0.7)',
            'rgba(0, 188, 212, 0.7)',
            'rgba(0, 150, 136, 0.75)',
            'rgba(76, 175, 80, 0.8)',
            'rgba(139, 195, 74, 0.85)',
            'rgba(205, 220, 57, 0.9)',
            'rgba(255, 235, 59, 0.95)',
            'rgba(255, 193, 7, 1)'
        ],
    
        components: {
    
            // Main components
            preview: true,
            opacity: true,
            hue: true,
    
            // Input / output Options
            interaction: {
                hex: true,
                rgba: true,
                hsla: true,
                hsva: true,
                cmyk: true,
                input: true,
                clear: true,
                save: true
            }
        }
    });
    pickr.on('change', (...ards) => {
        let color = ards[0].toRGBA();
        color_item.style.backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]},${color[3]})`;
});

});