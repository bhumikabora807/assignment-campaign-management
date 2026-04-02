import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-campaign',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './campaign.component.html'
})
export class CampaignComponent implements OnInit {

  pages: any[] = [];
  campaigns: any[] = [];
  filteredCampaigns: any[] = [];

  filterStatus = 'All';
  isEditMode = false;
  editId: string | null = null;

  errorMessage = '';

  campaign = {
    pageId: '',
    name: '',
    budget: 0,
    startDate: '',
    endDate: ''
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadPages();
    this.loadCampaigns();
  }

  loadPages() {
    this.api.getPages().subscribe({
      next: res => this.pages = res,
      error: () => this.errorMessage = 'Failed to load pages'
    });
  }

  loadCampaigns() {
    this.api.getCampaigns().subscribe({
      next: res => {
        this.campaigns = res;
        this.applyFilter();
      },
      error: () => this.errorMessage = 'Failed to load campaigns'
    });
  }

  applyFilter() {
    this.filteredCampaigns =
      this.filterStatus === 'All'
        ? this.campaigns
        : this.campaigns.filter(c => c.status === this.filterStatus);
  }

  isFormValid(): boolean {
    if (!this.campaign.pageId) return false;
    if (!this.campaign.name.trim()) return false;
    if (this.campaign.budget <= 0) return false;
    if (!this.campaign.startDate || !this.campaign.endDate) return false;
    if (this.campaign.endDate < this.campaign.startDate) return false;
    return true;
  }

  submitCampaign() {
    this.errorMessage = '';

    if (!this.isFormValid()) {
      this.errorMessage = 'Please correct the errors before submitting.';
      return;
    }

    const request = this.isEditMode && this.editId
      ? this.api.updateCampaign(this.editId, this.campaign)
      : this.api.createCampaign(this.campaign);

    request.subscribe({
      next: () => {
        this.resetForm();
        this.loadCampaigns();
      },
      error: () => {
        this.errorMessage = 'Server error. Please try again.';
      }
    });
  }

  editCampaign(c: any) {
    this.isEditMode = true;
    this.editId = c.id;
    this.campaign = { ...c };
  }

  resetForm() {
    this.isEditMode = false;
    this.editId = null;
    this.errorMessage = '';
    this.campaign = {
      pageId: '',
      name: '',
      budget: 0,
      startDate: '',
      endDate: ''
    };
  }

  deleteCampaign(id: string) {
    this.api.deleteCampaign(id).subscribe(() => {
      this.loadCampaigns();
    });
  }

  getPageName(pageId: string) {
    return this.pages.find(p => p.id === pageId)?.name || '—';
  }
}