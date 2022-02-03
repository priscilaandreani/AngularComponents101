import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit, OnDestroy, OnChanges {
  ngOnInit(): void {
    this.startCountdown();
  }

  //garante que o timeout seja limpo ao encerrar a navegação
  ngOnDestroy(): void {
    this.clearTimeout();
  }

  // executa quando a interface é alterada pelo usuário
  ngOnChanges(changes: SimpleChanges): void {
    console.log('init value updated to:', changes.init.currentValue);
    this.startCountdown();
  }

  @Input() init: number = null;
  public counter: number = 0;
  private countdownTimerRef: any = null;

  @Output() onDecrease = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<void>();

  constructor() {}

  startCountdown() {
    if (this.init && this.init > 0) {
      this.clearTimeout();
      this.counter = this.init;
      this.doCountdown();
    }
  }

  doCountdown() {
    this.countdownTimerRef = setTimeout(() => {
      this.counter = this.counter - 1;
      this.processCount();
    }, 1000);
  }

  private clearTimeout() {
    if (this.countdownTimerRef) {
      clearTimeout(this.countdownTimerRef);
      this.countdownTimerRef = null;
    }
  }

  processCount() {
    this.onDecrease.emit(this.counter);
    console.log('count is', this.counter);

    if (this.counter == 0) {
      this.onComplete.emit();
    } else {
      this.doCountdown();
    }
  }
}
