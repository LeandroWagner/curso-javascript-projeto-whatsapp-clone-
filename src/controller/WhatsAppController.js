class WhatsAppController {

    constructor() {
        console.log('WhatsAppController OK')

        //prototype
        this.elementsPrototype()

        //carrega os elementos
        this.loadElements()

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
        }

        Element.prototype.show = function() {

            this.style.display = 'block';
        }

        Element.prototype.toggle = function() {

            this.style.display = (this.style.display === 'none') ? 'block' : 'none'
            
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
            
        }



    }

}