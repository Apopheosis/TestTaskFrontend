import {Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation} from "@angular/core";
import {ModalService} from "../services/modal.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'jw-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(10px)'}),
        animate('500ms', style({opacity: 1, transform: 'translateY(0)'})),
      ]),
      transition(':leave', [
        animate('500ms', style({opacity: 0, transform: 'translateY(10px)'}))
      ])
    ])
  ]
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id?: string;
  isOpen = false;
  private element: any;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement
  }

  ngOnInit() {
    this.modalService.add(this);
    document.body.appendChild(this.element);

    this.element.addEventListener('click', (el: any) => {
      if (el.target.className === 'jw-modal') {
        this.close();
      }
    })
  }

  ngOnDestroy() {
    this.modalService.remove(this)
    this.element.remove();
  }

  open() {
    this.isOpen = true;
    const timeout = 30000;
    this.element.style.display = 'block';
    document.body.classList.add('jw-modal-open')

    setTimeout(() => {
      this.close()
    }, timeout)
  }

  close() {
    this.isOpen = false;
    this.element.style.display = 'none';
    document.body.classList.remove('jw-modal-open');

  }
}
