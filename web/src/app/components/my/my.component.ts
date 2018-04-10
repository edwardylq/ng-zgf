import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';



@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.scss']
})
export class MyComponent implements OnInit {

constructor(private http: Http) { }

  ngOnInit() {
    this.http.get('http://10.3.136.49:1300/buycar').subscribe((res)=>{
        let config = res.json();
        console.log(config);
    })
  }

}
