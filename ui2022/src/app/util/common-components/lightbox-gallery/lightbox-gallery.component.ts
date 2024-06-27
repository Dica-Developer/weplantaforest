import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-lightbox-gallery',
    templateUrl: './lightbox-gallery.component.html',
    styleUrls: ['./lightbox-gallery.component.scss'],
    standalone: true,
    imports: [
        MatIcon,
        NgFor,
        NgIf,
    ],
})
export class LightboxGalleryComponent implements OnInit {
  @Input() images: { imageUrl: string; caption: string }[];
  slideIndex = 0;

  constructor(private elem: ElementRef) {}

  ngOnInit(): void {
  }

  openModal(index: number) {
    this.slideIndex = index;
    this.showSlides(index);
    this.elem.nativeElement.querySelectorAll('.lightbox')[0].style.display = 'block';
  }

  // Next/previous controls
  plusSlides(n) {
    this.showSlides((this.slideIndex += n));
  }

  setCurrentSlide(index) {
    this.slideIndex = index;
    this.showSlides(index);
  }

  // listens for escape key when menu open
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.plusSlides(-1);
    } else if (event.key === 'ArrowRight') {
      this.plusSlides(1);
    } else if (event.key === 'Escape') {
      this.closeModal();
    }
  }

  showSlides(index) {
    this.slideIndex = index;
    let slides = this.elem.nativeElement.querySelectorAll('.mySlides');

    if (index > this.images.length - 1) {
      this.slideIndex = this.images.length - 1;
    }
    if (index < 0) {
      this.slideIndex = 0;
    }
    for (let i = 0; i < this.images.length; i++) {
      let slide = slides[i] as HTMLElement;
      slide.style.display = 'none';
      setTimeout(() => {
        slide.style.opacity = '0';
      }, 1);
    }
    let slide = slides[this.slideIndex] as HTMLElement;
    slide.style.display = 'flex';
    setTimeout(() => {
      slide.style.opacity = '1';
    }, 1);
  }

  closeModal() {
    let modal = this.elem.nativeElement.querySelectorAll('.lightbox');
    modal[0].style.display = 'none';
  }
}
