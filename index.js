var CursorTrap = function(){
    this.textarea = document.createElement('textarea');

    this.textarea.style.cssText = [
        'position: fixed',
        'opacity: 0.01',
        'left: -9999px',
        'height: 1px',
        'width: 1px',
        'top: 50%',
    ].join(';');

    this.eventHooks = ['keydown', 'keyup', 'focus', 'blur'];

    document.body.appendChild( this.textarea );
    this.saveScrollPosition();
    this.textarea.addEventListener( 'blur', this.destroy.bind( this ) );
    this.textarea.focus();
    return this;
};

CursorTrap.prototype.on = function( eventType, callback ){
    if ( this.eventHooks.indexOf( eventType ) > -1 ){
        this[eventType] = callback;
        this.textarea.addEventListener( eventType, function( ev ){
            this.saveScrollPosition();
            callback( ev );
        }.bind( this ));
    }
};

CursorTrap.prototype.saveScrollPosition = function(){
    // we need a little defer for the edge case:
    // when two cursor traps get instantiated after another (img to img hopping)
    this.scrollLeft = window.pageXOffset;
    this.scrollTop  = window.pageYOffset;
};

CursorTrap.prototype.restoreScrollPosition = function(){
    window.scrollTo( this.scrollLeft, this.scrollTop );
};

CursorTrap.prototype.destroy = function(){
    this.saveScrollPosition();
    this.textarea.parentNode.removeChild( this.textarea );
    this.restoreScrollPosition();
    this.delete;
};

module.exports = CursorTrap;
