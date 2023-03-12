import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent implements OnInit, OnDestroy {
  isMobileTabDisplay: Boolean = false;
  private subs = new SubSink();

  constructor(private breakpointObserver: BreakpointObserver,) { }

  ngOnInit(): void {
    this.checkDisplay();
  }

  checkDisplay() {
    this.subs.sink = this.breakpointObserver.observe('(max-width: 991px)').subscribe((result) => {
      this.isMobileTabDisplay = result.matches;
    });
  }
  
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
