<h1>Pict Browser for Angular</h1>
Pict browser is angular @Injectable class for image browsing.
<h2>Usage</h2>
Simply inject <strong>pict-browser.service.ts</strong> to constructor of your <strong>component.ts</strong>.
<h4>Example</h4>
<code>
  import { PictBrowser } from '../pict-browser.service';
</code>
  ...
<code>
  constructor(private browser: PictBrowser) {}
</code>
  ...
<code>  
  this.browser.openPictBrowser(srcs: string[], num: number);
</code>
<code>
  //srcs: image sources array
</code>
<code>
  //num: the image number from the array on which the browser is to be initialized
</code>
