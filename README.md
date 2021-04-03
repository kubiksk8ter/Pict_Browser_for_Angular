<h1>Pict Browser for Angular</h1>
Pict browser is angular @Injectable class for image browsing with presentation and swipe listener for touch devices.
<h2>Usage</h2>
Simply inject <strong>pict-browser.service.ts</strong> to constructor of your <strong>component.ts</strong>.
<h4>Example</h4>
<code>
  import { PictBrowser } from '../pict-browser.service';
</code><br>
  ...<br>
<code>
  constructor(private browser: PictBrowser) {}
</code><br>
  ...<br>
<code>  
  this.browser.openPictBrowser(srcs: string[], num: number);
</code><br>
<code>
  //srcs: image sources array
</code><br>
<code>
  //num: the image number from the array on which the browser is to be initialized
</code><br>

