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
                
                //cancela o comportamento padr??o
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

        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item=>{
            item.on('click', e=>{
                this.el.home.hide()
                this.el.main.css({
                    display:'flex'

                })
            })
        }) 

        this.el.btnAttach.on('click', e=>{

            e.stopPropagation()
            this.el.menuAttach.addClass('open')
            //Bind continua sendo o mesmo escopo
            document.addEventListener('click', this.closeMenuAttach.bind(this))
        })

        this.el.btnAttachPhoto.on('click', e=>{
          
            this.el.inputPhoto.click()

        })

        //executa uma funcao para verificar quais os arquivos anexados
        this.el.inputPhoto.on('change',e=>{

            //cole????o usando sprade (gera um array nas possi??oes certas)
            [...this.el.inputPhoto.files].forEach(file=>{

                   console.log(file) 
            })

        })

        this.el.btnAttachCamera.on('click', e=>{
            this.closeAllMainPanel()
            this.el.panelCamera.addClass('open')
            this.el.panelCamara.css({
                'height':'calc(100%-120px)'
            })

        })

        //veja para tirar a foto
        this.el.btnClosePanelCamera.on('click', e=>{
         
            this.closeAllMainPanel()
            this.el.panelMessagesContainer.show()

        })

        //tirar a photo
        this.el.btnTakePicture.on('click', e=>{

            console.log('take picture')

        })

        this.el.btnAttachDocument.on('click', e=>{
            
            this.closeAllMainPanel()
            this.el.panelDocumentPreview.addClass('open')
            this.el.panelDocumentPreview.css({
                'height':'calc(100%-120px)'
            })

        })

        this.el.btnAttachContact.on('click', e=>{
            
            this.closeAllMainPanel()
            this.el.menuAttach.addClass('open')

        })

        this.btnClosePanelDocumentPreview.on('click', e=>{

            this.closeAllLeftPanel()
            this.el.panelMessagesContainer.show()
        })

        this.btnSendDocument.on('click', e=>{

            console.log('Envia documento')
        })
        
        this.el.btnAttachContact.on('click', e=>{

            this.el.modalContacts.show()
        })

        this.btnCloseModalContacts.on('click', e=>{
            
            this.el.modalContacts.hide()
        
        })

        this.el.btnSendMicrophone.on('click', e=>{

            this.el.recordMicrophone.show();
            this.el.btnSendMicrophone.hide();
            this.el.startRecordMicrophoneTime();

        });

        this.el.btnCancelMicrophone.on('click', e=>{

            this.closeRecordMicrophone();

        });

        this.el.btnFinishMicrophone.on('click', e=>{

            this.closeRecordMicrophone();
        });

        //Emojis
        this.el.btnEmojis.on('click', e=>{

            this.el.panelEmojis.togleClass('open')

        })

        this.el.panelEmojis.querySelectosAll('.emojik').forech(emoji=>{

            emoji.on('click', e=>{

                console.log(emoji.dataset.unicode)
                let img =  this.el.imgEmojiDefault.cloneNode()

                img.style.ccsText = emoji.style.cssText
                img.dataset.unicode = emoji.dataset.unicode
                img.alt = emoji.dataset.unicode

                emoji.classList.forEach(name=>{
                    img.classList.add(name)

                })

                this.el.inputText.appendChild(img)

                this.el.inputText.dispatchEvent(new Event('keyup'))


            })
        })

        //inputs text
        this.el.inputText.on('keypress', e=>{

            if (e.key === 'Enter' && !e.ctrkey) {

                e.preventDefault()
                this.el.btnSend.click()

            }

        })

        //inputs text
        this.el.inputText.on('keyup', e=>{

            //se tiver alguma coisa preenchida
            if (this.el.inputText.innerHTML.length) {

                this.el.inputPlaceholder.hide()
                this.el.btnSendMicrophone.hide()
                this.el.btnSend.show()

            } else {

                this.el.inputPlaceholder.show()
                this.el.btnSendMicrophone.show()
                this.el.btnSend.hide()
            }

        })
    
        this.el.btnSend.on('click', e=>{

            console.log(this.el.inputText.innerHTML)
        })


       
    } 
    
    

    //timer da grava????o.
    startRecordMicrophoneTime()
    {
        let start = Date.now()

        //formantando o
        this._recordMicrophoneInterval = setInterval(()=>{
            this.el.recordMicropneTimer.innerHTML = Format.toTime(DataTransfer.now() - start);

        },100)
    }


    closeRecordMicrophone() 
    {
       this.el.recordMicrophone.hide()
       this.el.btnSendMicrophone.show()
       clearInterval(this._recordMicrophoneInterval)
    
    }

    closeAllMainPanel() {

        this.el.panelMessagesContainer.hide()
        this.el.panelDocumentPreview.removeClass('open')
        this.el.panelCamera.removeClass('open')
    }

    //Esconde todos os paineis do lado esquerdo.
    closeAllLeftPanel() {
        this.el.panelEditProfile.hide()
        this.el.panelAddContact.hide()
    }

    closeMenuAttach(e) {
        document.removeEventListener('click', this.closeMenuAttach)
        this.el.menuAttach.addClass('open')

    }   
  
}