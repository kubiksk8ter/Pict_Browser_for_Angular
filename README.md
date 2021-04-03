<h1>Pict Browser for Angular</h1>
Pict browser is angular @Injectable class for image browsing.
<h2>Usage</h2>
Simply inject <strong>pict-browser.service.ts</strong> to constructor of your <strong>component.ts</strong>.
<h4>Example</h4>
<code>
  import { PictBrowser } from '../pict-browser.service';/n
  .../n
  constructor(private browser: PictBrowser) {}/n
  .../n
  this.browser.openPictBrowser(srcs: string[], num: number);/n
  //srcs: image sources array/n
  //num: the image number from the array on which the browser is to be initialized/n
</code>
