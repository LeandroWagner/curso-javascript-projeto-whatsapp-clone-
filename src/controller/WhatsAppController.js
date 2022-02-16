class WhatsAppController {

    constructor() {
        console.log('WhatsAppController OK')
      
        //prototype
        this.elementsPrototype()

        //carrega os elementos
        this.loadElements()

          //carrega os eventos
        this.initEvents()
        
    }

    loadElements() {

        this.el = {}

        document.querySelectorAll('[id]').forEach(element=>{

            this.el[Format.getCamelCase(element.id)] = element;
        });
    }

    //falar qual classe
    elementsPrototype() {

        Element.prototype.hide = function() {

            this.style.display = 'none';
            return this
        }

        Element.prototype.show = function() {

            this.style.display = 'block';
            return this

        }

        Element.prototype.toggle = function() {

            this.style.display = (this.style.display === 'none') ? 'block' : 'none'
            return this  
        }

        Element.prototype.on = function(events, fn) {

            events.split('').forEach(event=>{

                this.addEventListener(event, fn);

            });
            
        }

        Element.prototype.css = function(styles) {

           for(let name in styles) {
                this.style[name] = styles[name]

           }
           return this
            
        }

        Element.prototype.addClass = function(name) {

           this.classList.add(name)
             
        }

        Element.prototype.removeClass = function(name) {

            this.classList.remove(name)
              
        }
 
        Element.prototype.toggleClass = function(name) {

            this.classList.toggle(name)
              
        }

        Element.prototype.hasClass = function(name) {

            return this.classList.contains(name)
              
        }

        HTMLFormElement.prototype.getForm = function () {
            
            return new FormData(this);
        }

        HTMLFormElement.prototype.toJSON = function () {
            
            let json = {}

            this.getForm().forEach((value, key)=>{

                json[key] = value
            })

            return json
        }

    



    }

    initEvents() {
       
        this.el.myPhoto.on('click', e=>{
            this.closeAllLeftPanel()
            this.el.panelEditProfile.show()
            setTimeout(()=>{
                this.el.panelEditProfile.addClass('open')
            }, 300)
           
           
        });

        //abre profile
        this.el.btnNewContact.on('click', e=>{
            this.closeAllLeftPanel()
            this.el.panelAddContact.show()
          

        });

        //fecha profile
        this.el.btnClosePanelEditProfile.on('click', e=>{
            this.el.panelEditProfile.removeClass('open')

        });

        this.el.btnClosePanelAddContact.on('click', e=>{
            this.el.panelPanelAddContact.removeClass('open')

        });

        //Evento do click na foto
        this.el.photoContainerEditProfile.on('click', e=>{
            this.el.inputProfilePhoto.click()

        });

        //Nome da phot
        this.el.inputNamePanelEditProfile.on('keypress', e=>{
            
            if (e.key === 'Enter') {
                
                //cancela o comportamento padrão
                e.preventDefault()
                this.el.btnSavePanelProfile.click()
            }

       });

       this.el.btnSavePanelProfile.on('click', e=>{
        
        console.log(this.el.inputNamePanelEditProfile.innerHTML)
       
       });

       this.el.formPanelAddContact.on('submit', e=>{

            e.preventDefault();

            let formData = new FormData(this.el.formPanelAddContact)

       });

    }  

    //Esconde todos os paineis do lado esquerdo.
    closeAllLeftPanel() {
        this.el.panelEditProfile.hide()
        this.el.panelAddContact.hide()
    }  
}