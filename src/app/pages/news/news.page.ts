import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  newsList = [];
  constructor(private news: NewsService) { }

  ngOnInit() {
    this.getNews();
  }

  getNews(): any{
    this.news.getNews().subscribe((data: any) => {
      console.log(data);
      this.newsList = data;
    });
  }
}
