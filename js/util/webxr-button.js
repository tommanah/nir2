export class WebXRButton {
    constructor(options = {}) {
        this.domElement = document.createElement('button');
        this.domElement.style.display = 'none';
        
        this._session = null;
        
        this.onRequestSession = options.onRequestSession;
        this.onEndSession = options.onEndSession;
        
        this.textEnterXRTitle = options.textEnterXRTitle || 'START AR';
        this.textXRNotFoundTitle = options.textXRNotFoundTitle || 'AR NOT FOUND';
        this.textExitXRTitle = options.textExitXRTitle || 'EXIT AR';
        
        this.domElement.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 12px 24px;
            border: none;
            border-radius: 4px;
            background: #fff;
            color: #000;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            outline: none;
            z-index: 999;
        `;
    }

    setSession(session) {
        this._session = session;
        
        if (session) {
            this.domElement.style.display = '';
            this.domElement.textContent = this.textExitXRTitle;
            this.domElement.onclick = () => {
                if (this.onEndSession) this.onEndSession();
            };
        } else {
            this.domElement.textContent = this.textEnterXRTitle;
            this.domElement.onclick = () => {
                if (this.onRequestSession) this.onRequestSession();
            };
        }
    }

    set enabled(value) {
        this.domElement.style.display = value ? '' : 'none';
    }
} 