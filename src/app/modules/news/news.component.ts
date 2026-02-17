import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsService } from '../../services/news/news.service';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {
  newsArticles: any[] = [];
  loading = true;
  error: string | null = null;
  searchTerm: string = '';

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews(): void {
    this.loading = true;
    this.error = null;

    this.newsService.getAgriNews(this.searchTerm).subscribe({
      next: (data) => {
        this.newsArticles = data.articles;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching news:', err);
        this.error = 'Failed to load news. Please try again later.';
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    this.loadNews();
  }
}
