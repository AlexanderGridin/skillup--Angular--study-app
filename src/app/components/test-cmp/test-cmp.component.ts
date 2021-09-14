import { Component, OnInit } from '@angular/core';
import { categories } from 'src/app/data/categories';

@Component({
  selector: 'app-test-cmp',
  templateUrl: './test-cmp.component.html',
  styleUrls: ['./test-cmp.component.css'],
})
export class TestCmpComponent implements OnInit {
  public dropDownItems = categories;
  public gridItems = categories;
  public defaultItem = categories[0];
  public value: Date = new Date(2000, 2, 10);

  constructor() {}

  ngOnInit(): void {}
}
