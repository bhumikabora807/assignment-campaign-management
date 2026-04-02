import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {

  pages: any[] = [];

  page = {
    name: '',
    category: ''
  };

  loading = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadPages();
  }

  // 🔹 Load all pages
  loadPages(): void {
    this.api.getPages().subscribe({
      next: (res) => {
        this.pages = res;
        console.log('Pages loaded:', res);
      },
      error: (err) => {
        console.error('Failed to load pages', err);
        alert('Failed to load pages');
      }
    });
  }

  // 🔹 Create new page
  createPage(): void {
    if (!this.page.name.trim() || !this.page.category.trim()) {
      alert('Please fill all fields');
      return;
    }

    this.loading = true;

    this.api.createPage(this.page).subscribe({
      next: (res) => {
        console.log('Page created:', res);
        this.page = { name: '', category: '' };
        this.loadPages();
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to create page', err);
        alert('Failed to create page');
        this.loading = false;
      }
    });
  }
}