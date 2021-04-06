import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PictBrowser {
    private renderer: Renderer2;
    private pictNumber: number = 0;
    private srcs: string[] = [];
    private isPresentationActivated: boolean = false;
    private interval: any = null;
    private pictureLeaveAnnimationTime: number = 600;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  
  openPictBrowser(srcs: string[], num: number) {
      this.pictNumber = num-1;
      this.srcs = srcs;
      //delete last gallery-pic-browser
      this.createGalleryPicBrowser();
      const galleryElement = document.getElementById('gallery-pic-browser');
      if (document.getElementById('browserPict')) {
        this.renderer.removeChild(galleryElement, document.getElementById('browserPic'))
      }
      //creating image     
      let picture = this.createImage(srcs[this.pictNumber]);          
      this.renderer.appendChild(galleryElement, picture);
           
      //creating nav bar
      this.createNav();
      //setting next btn listener
      this.renderer.listen(document.getElementById('nextbtn'), 'click', ()=>{
        this.addNextListener();
      });
      this.animation('nextbtn'); 
      //setting back btn listener
      this.renderer.listen(document.getElementById('backbtn'), 'click', ()=>{
        this.addBackListener();
      });
      this.animation('backbtn');
      //setting presentation listeners     
      let presentation = document.getElementById('presentation');
      this.renderer.listen(presentation, 'click', ()=>{
          this.isPresentationActivated ?
           this.stopPresentation()
           : 
           this.startPresentation();
      });
  }
  
  private createImage(src: string): Element {
      if (document.getElementById('browserPict')) {
          this.renderer.removeChild(document.getElementById('gallery-pic-browser'), document.getElementById('browserPict'));
      }
      let picture = this.renderer.createElement('img'); 
      this.renderer.setProperty(picture, 'src', src);
      this.renderer.setAttribute(picture, 'id', 'browserPict')
      this.renderer.setProperty(picture, 'alt', 'pict');      
      this.renderer.setAttribute(picture, 'style', `
        max-height: 100%;
        max-width: 100%;
        width: auto;
        height: auto;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
      `);
      this.addSwipeListener(picture);
      return picture;
  }
 
  private createGalleryPicBrowser() {
      const lastElement = document.getElementById('gallery-pic-browser');
      const element = document.body;
      const left = window.pageXOffset;
          
      if(lastElement) {
          this.renderer.removeChild(element, lastElement);
      }
     
      const top = window.pageYOffset;
      //creating main div
      let div = this.renderer.createElement('div');      
      this.renderer.setAttribute(div, 'id', 'gallery-pic-browser');
      
      this.renderer.setAttribute(div, 'style', `
        background-color: black;
        position: absolute; left: ${left}px;
        width: 100%; height: 100%;
        z-index: 2;
        top: ${top}px
      `);
      if( /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
          let vh = window.innerHeight;
          this.renderer.setAttribute(div, 'style', `
            background-color: black;
            position: absolute;
            width: 100%; height: calc(var(--vh, 1vh) * 100);
            z-index: 2;
            top: ${top}px
           `);
      } 
           
      this.renderer.addClass(div, 'anime');    
      //creating close button
      let close = this.createCloseBtn('10px', 'calc(100% - 40px)');
      //appending child
      this.renderer.appendChild(div, close);
      this.renderer.appendChild(element, div);
      //setting close listener
      this.renderer.listen(close, 'click', ()=>{
          this.renderer.removeChild(element, div);
          //enable scrolling
          window.onscroll=function(){};
      });
      //disable scrolling     
      var x=window.scrollX;
      var y=window.scrollY;
      window.onscroll=function(){window.scroll(x, y);}
      this.renderer.listen(div, 'touchmove',(e: TouchEvent)=>{ 
          window.scroll(x, y);
          
      });    
  }
  //CREATING CLOSE BUTTON AND NAVIGATION
  private createCloseBtn(top: string, left: string): Element {
      let back = this.renderer.createElement('div');
      this.renderer.setAttribute(back, 'id', 'back-gallery-browser');
      this.renderer.setAttribute(back, 'style', `
        width:30px;
        height: 30px;
        position: absolute;
        left: ${left}; top: ${top};
        z-index: 1;
        display: flex;
        align-content: center;
        z-index: 3;
      `);
      back.innerHTML = `
        <svg>
            <path d="M 5 5 L 25 25 M 25 5 L 5 25"
                  fill="none"
                  stroke-width= "3px"
                  stroke-linecap="round"
                  style="stroke: var(--button-color)"/>
        </svg>
      `;
      
      return back;    
  }
  
  private createNav() {
      const galleryElement = document.getElementById('gallery-pic-browser');
      const height = '40px';
      
      let nav = this.renderer.createElement('div');
      let presentation = this.renderer.createElement('div');
      let next = this.renderer.createElement('div');
      let back = this.renderer.createElement('div');
      //navigation      
      this.renderer.setAttribute(nav, 'style', `
        width: 120px;
        height: ${height};
        position: absolute; bottom: 20px; right: 20px;
        border: 3px solid black; box-shadow: 0 0 0 2px white;
        border-radius: 20px;
        overflow: hidden;
        opacity: 0.5;
        z-index: 1;
      `);
      //back btn
      this.renderer.setAttribute(back, 'id', 'backbtn');
      this.renderer.setAttribute(back, 'style', `
        background-color: var(--button-color);
        width: 60px;
        height: ${height};
        position: absolute; left: -10px;
      `);
      back.innerHTML = `
        <svg style="width: 30px; height: 30px; position: absolute; left: 20px; top: 7px;">
            <path d="M 3 13 L 13 23 M 13 3 L 3 13"
                  fill="none"
                  stroke-width= "3px"
                  stroke-linecap="round"
                  style="stroke: black"/>
        </svg>
      `;
      //next btn
      this.renderer.setAttribute(next, 'id', 'nextbtn');
      this.renderer.setAttribute(next, 'style', `
        background-color: var(--button-color);
        width: 60px;
        height: ${height};
        position: absolute; right: -10px;
      `);
      next.innerHTML = `
        <svg style="width: 30px; height: 30px; position: absolute; left: 23px; top: 7px;">
            <path d="M 13 13 L 3 23 M 3 3 L 13 13"
                  fill="none"
                  stroke-width= "3px"
                  stroke-linecap="round"
                  style="stroke: black"/>
        </svg>
      `;
      //presentation btn
      this.renderer.setAttribute(presentation, 'id', 'presentation');
      this.renderer.setAttribute(presentation, 'style', `
        background-color: var(--button-color);
        width: 40px;
        height: ${height};
        position: absolute; left: calc(50% - 22px);
        border-style: solid; border-color: black; border-width: 0px 2px 0px 2px;
        border-radius: 5px;
      `);     
      presentation.innerHTML = `
        <svg style="width: 30px; height: 30px; position: absolute; left: 13px; top: 7px;">
            <path d="M 13 13 L 3 23 L 3 3 M 3 3 L 13 13"
                  fill="none"
                  stroke-width= "3px"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  style="stroke: black"/>
        </svg>
      `
     
      this.renderer.appendChild(nav, back);
      this.renderer.appendChild(nav, next);
      this.renderer.appendChild(nav, presentation);
      this.renderer.appendChild(galleryElement, nav);
  }
  //NAV BUTTON LISTENERS
  private startPresentation() {
      this.presentationActivatedAnimation('presentation');     
      this.isPresentationActivated = true;       
      this.interval = setInterval(()=>{
        this.pictNumber++;          
        if(typeof this.srcs[this.pictNumber] == 'undefined') {
            this.presentationDeactivatedAnimation('presentation');
            this.pictNumber--;
            this.isPresentationActivated = false;
            clearInterval(this.interval);
            console.log('presentation deactivated');
            return;
        }
        this.leavePictLeft('browserPict');
          setTimeout(()=>{
            let picture = this.createImage(this.srcs[this.pictNumber]);          
            this.renderer.appendChild(document.getElementById('gallery-pic-browser'), picture);
        }, this.pictureLeaveAnnimationTime);
      },4000);
      console.log('presentation activated');                                                           
  }
  
  private stopPresentation() {
      this.presentationDeactivatedAnimation('presentation');
      this.isPresentationActivated = false;
      clearInterval(this.interval);
      console.log('presentation deactivated');
  }
    
  private addBackListener() {     
          this.pictNumber--;          
          if(typeof this.srcs[this.pictNumber] == 'undefined') {
              this.pictNumber++; return;          
          }
          this.leavePictRight('browserPict');
          setTimeout(()=>{
            let picture = this.createImage(this.srcs[this.pictNumber]);          
            this.renderer.appendChild(document.getElementById('gallery-pic-browser'), picture);
          }, this.pictureLeaveAnnimationTime);              
  }
    
  private addNextListener() {
          this.pictNumber++;          
          if(typeof this.srcs[this.pictNumber] == 'undefined') {
              this.pictNumber--; return;
          }
          this.leavePictLeft('browserPict');
          setTimeout(()=>{
            let picture = this.createImage(this.srcs[this.pictNumber]);          
            this.renderer.appendChild(document.getElementById('gallery-pic-browser'), picture);
          }, this.pictureLeaveAnnimationTime);
  }
  //SWIPE LISTENER
  addSwipeListener(element: Element) {
      //const element = document.getElementById(id);
      var touchStart = 0;
      var startTime = 0;
      var touchMove = touchStart;
      var endTime = 0;
           
        /* touch start and start time value */
        element.addEventListener('touchstart',(e: TouchEvent)=>{ 
          //e.preventDefault();                  
          touchStart = Math.ceil(e.touches[0].clientX);
          startTime = new Date().getTime();           
          //document.getElementById('testing').innerHTML = `touchstart: ${Math.ceil(e.touches[0].clientX)}`;  //test                            
        });        
        /* touch end and end time value */
        element.addEventListener("touchstart", (event) => {
            //event.preventDefault();            
            const onTouchMove = () => {
                // handle touchmove here
                element.addEventListener('touchmove',(e: TouchEvent)=>{
                    touchMove = Math.ceil(e.targetTouches[0].clientX);
                    //test
                    var target = e.target || e.srcElement || e.currentTarget;
                    //document.getElementById('testing').innerHTML = `${e.target}`;
                });
            }
            const onTouchEnd = () => {
                // handle touchend here
                event.target.removeEventListener("touchmove", onTouchMove);
                event.target.removeEventListener("touchend", onTouchEnd);
                endTime = new Date().getTime();
                // SWIPE SOLUTION   
                if((Math.ceil(endTime - startTime)) < 300) {
                    //swipe to right
                    if((touchMove - touchStart) > 120) {
                        this.addBackListener(); }
                    //swipe to left    
                    else if((touchStart - touchMove) > 120) {
                        this.addNextListener(); }                                                                                              
                }
            }
            event.target.addEventListener("touchmove", onTouchMove);
            event.target.addEventListener("touchend", onTouchEnd);                          
        });                         
    }
  //ANIMATIONS
  private animation(id: string) {
      let element = document.getElementById(id);
      this.renderer.listen(element, 'click', ()=>{
          element.animate({backgroundColor: 'red'},{
                    duration: 0,
                    fill: 'forwards'
                });        
          element.animate({backgroundColor: 'var(--button-color)'},{
                    duration: 500,
                    fill: 'forwards'
                });
      });    
  }
  
  private presentationActivatedAnimation(id: string) {
      let element = document.getElementById(id);
          element.animate({backgroundColor: 'var(--button-color)'},{
                    duration: 0,
                    fill: 'forwards'
                });        
          element.animate({backgroundColor: 'red'},{
                    duration: 500,
                    fill: 'forwards'
                });   
  }
  
  private presentationDeactivatedAnimation(id: string) {
      let element = document.getElementById(id);
          element.animate({backgroundColor: 'red'},{
                    duration: 0,
                    fill: 'forwards'
                });        
          element.animate({backgroundColor: 'var(--button-color)'},{
                    duration: 500,
                    fill: 'forwards'
                });
  }
  
  private leavePictRight(id: string) {
      let element = document.getElementById(id);
      element.animate({transform: 'translateX(0px)', opacity: '1'},{
                    duration: 0,
                    fill: 'forwards'
                });        
          element.animate({transform: 'translateX(200px)', opacity: '0'},{
                    duration: this.pictureLeaveAnnimationTime,
                    fill: 'forwards'
                });
  }
  
  private leavePictLeft(id: string) {
      let element = document.getElementById(id);
      element.animate({transform: 'translateX(0px)', opacity: '1'},{
                    duration: 0,
                    fill: 'forwards'
                });        
          element.animate({transform: 'translateX(-200px)', opacity: '0'},{
                    duration: this.pictureLeaveAnnimationTime,
                    fill: 'forwards'
                });
  }
}
