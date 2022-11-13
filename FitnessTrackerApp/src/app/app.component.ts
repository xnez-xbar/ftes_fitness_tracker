import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from './interfaces/interfaces';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  public menu: Observable<Menu[]>
  public logos: Menu[] = []

  constructor( private dataService: DataService ) {}

  ngOnInit(): void {
    this.menu = this.dataService.getMenuOpts();
    this.dataService.getLogos().subscribe(logos => this.logos.push(...logos));
  }
}


