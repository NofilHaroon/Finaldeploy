import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mimmar';
  constructor(){}
  ngOnInit(): void {
    (function(d, m){
      const kommunicateSettings = {appId: '25710b89a7c5d05097c1f0086cd40815', popupWidget: true, automaticChatOpenOnNavigation: true};
      const s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;
      s.src = 'https://widget.kommunicate.io/v2/kommunicate.app';
      const h = document.getElementsByTagName('head')[0]; h.appendChild(s);
      (window as any).kommunicate = m; m._globals = kommunicateSettings;})(document, (window as any).kommunicate || {});
  }
}
